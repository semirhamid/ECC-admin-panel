"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import authAxios from "@/utils/axiosWithAxios";
import UsersDropdown from "@/components/home/UserDropdown";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { usePathname } from 'next/navigation';
import DynamicSelect from "@/components/ssl/DynamicSelect";
import { Alert } from "@mui/material";


interface DropDown {
  options: string[];
}

interface InputFieldProps {
  label: string;
  value: string | number;
  placeholder: string;
  type: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface AddressDetail {
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  country: string;
  postCode: string;
  city: string;
}

interface ChargeInfo {
  noAcPoints: number;
  noDcPoints: number;
  makeOfChargePoint: string; //dropdown
  ampsPerCp: string;
  kwPerCp: string; //dropdown
  wallMountSingle: string;
  wallMountDual: string;
  floorMountSingle: string;
  floorMountDual: string;
}

interface ElectricalSetup {
  phaseType: string; //dropdown
  mainsFuseSize: number;
  mainsIsolation: string; //dropdown
  earthingSetup: string; //dropdown
  mobileSignal: string; //dropdown
  signalStrength: string; //dropdown
  consumerUnitMake: string;
  consumerUnitModel: string;
  totalSpareWays: string; //dropdown
  totalAmpsInUse: string;
}

interface InstallationSetup {
  cableSizeRead: string; //mm
  cableLengthTotal: string; //meter
  totalCableRuns: string;
  internalCableAttachment: string;
  installationEarthingSetup: string; //dropdown
  dataCableRun: string;
  cableRunDescription: string;
}

interface GroundWorks {
  selectOptions: string; // dropdown
  gwLength: string; //meters
  gwWidth: string; //mm
  gwDepth: string; //mm
  ductingSize: string; //dropdown
  ductingLength: string; //meters
  groundWorksDescription: string;
}

interface Sslinfo {
  address: AddressDetail;
  chargeInfo: ChargeInfo;
  electricalSetup: ElectricalSetup;
  installationSetup: InstallationSetup;
  groundWorks: GroundWorks;
}

interface UserAvatarProps {
  src: string;
  name: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  profileImageUrl: string | null;
}


type Status = 'Saved' | 'Under Review' | 'Sent';


const mapPostDataToState = (postDataObj: any) => {
  return {
    address: {
      address1: postDataObj.address1 || '',
      address2: postDataObj.address2 || '',
      address3: postDataObj.address3 || '',
      address4: postDataObj.address4 || '',
      country: postDataObj.country || '',
      postCode: postDataObj.postCode || '',
      city: postDataObj.city || ''
    },
    chargeInfo: {
      noAcPoints: postDataObj.noAcPoints || 0,
      noDcPoints: postDataObj.noDcPoints || 0,
      makeOfChargePoint: postDataObj.makeOfChargePoint || '',
      ampsPerCp: postDataObj.ampsPerCp || '',
      kwPerCp: postDataObj.kwPerCp || '',
      wallMountSingle: postDataObj.wallMountSingle || 0,
      wallMountDual: postDataObj.wallMountDual || 0,
      floorMountSingle: postDataObj.floorMountSingle || 0,
      floorMountDual: postDataObj.floorMountDual || 0
    },
    electricalSetup: {
      phaseType: postDataObj.phaseType || '',
      mainsFuseSize: postDataObj.mainsFuseSize || '',
      mainsIsolation: postDataObj.mainsIsolation || '',
      earthingSetup: postDataObj.earthingSetup || '',
      mobileSignal: postDataObj.mobileSignal || '',
      signalStrength: postDataObj.signalStrength || '',
      consumerUnitMake: postDataObj.consumerUnitMake || '',
      consumerUnitModel: postDataObj.consumerUnitModel || '',
      totalSpareWays: postDataObj.totalSpareWays || '',
      totalAmpsInUse: postDataObj.totalAmpsInUse || ''
    },
    installationSetup: {
      cableSizeRead: postDataObj.cableSizeRead || '',
      cableLengthTotal: postDataObj.cableLengthTotal || '',
      totalCableRuns: postDataObj.totalCableRuns || '',
      internalCableAttachment: postDataObj.internalCableAttachment || '',
      installationEarthingSetup: postDataObj.installationEarthingSetup || '',
      dataCableRun: postDataObj.dataCableRun || '',
      cableRunDescription: postDataObj.cableRunDescription || ''
    },
    groundWorks: {
      selectOptions: postDataObj.selectOptions || '',
      gwLength: postDataObj.gwLength || '',
      gwWidth: postDataObj.gwWidth || '',
      gwDepth: postDataObj.gwDepth || '',
      ductingSize: postDataObj.ductingSize || '',
      ductingLength: postDataObj.ductingLength || '',
      groundWorksDescription: postDataObj.groundWorksDescription || ''
    }
  };
};


// selectOptions: "",
// gwLength: "",
// gwWidth: "",
// gwDepth: "",
// ductingSize: "",
// ductingLength: "",
// groundWorksDescription: "",

const mapStateToPostData = (formData: any, edit = false, id: any) => {
  let postData = {
    createdById: id,
    assignedToId: id,
    status: formData.status || 'Sent',
    address1: formData.address.address1 || '',
    address2: formData.address.address2 || '',
    address3: formData.address.address3 || '',
    address4: formData.address.address4 || '',
    city: formData.address.city || '',
    country: formData.address.country || '',
    postCode: formData.address.postCode || '',
    noAcPoints: formData.chargeInfo.noAcPoints || 0,
    noDcPoints: formData.chargeInfo.noDcPoints || 0,
    makeOfChargePoint: formData.chargeInfo.makeOfChargePoint || '',
    ampsPerCp: formData.chargeInfo.ampsPerCp || '',
    kwPerCp: formData.chargeInfo.kwPerCp || '',
    wallMountSingle: formData.chargeInfo.wallMountSingle || 0,
    wallMountDual: formData.chargeInfo.wallMountDual || 0,
    floorMountSingle: formData.chargeInfo.floorMountSingle || 0,
    floorMountDual: formData.chargeInfo.floorMountDual || 0,
    phaseType: formData.electricalSetup.phaseType || '',
    mainsFuseSize: formData.electricalSetup.mainsFuseSize || '',
    mainsIsolation: formData.electricalSetup.mainsIsolation || '',
    earthingSetup: formData.electricalSetup.earthingSetup || '',
    mobileSignal: formData.electricalSetup.mobileSignal || '',
    signalStrength: formData.electricalSetup.signalStrength || '',
    consumerUnitMake: formData.electricalSetup.consumerUnitMake || '',
    consumerUnitModel: formData.electricalSetup.consumerUnitModel || '',
    totalSpareWays: formData.electricalSetup.totalSpareWays || '',
    totalAmpsInUse: formData.electricalSetup.totalAmpsInUse || '',
    cableSizeRead: formData.installationSetup.cableSizeRead || '',
    cableLengthTotal: formData.installationSetup.cableLengthTotal || '',
    totalCableRuns: formData.installationSetup.totalCableRuns || '',
    internalCableAttachment: formData.installationSetup.internalCableAttachment || '',
    installationEarthingSetup: formData.installationSetup.installationEarthingSetup || '',
    dataCableRun: formData.installationSetup.dataCableRun || '',
    cableRunDescription: formData.installationSetup.cableRunDescription || '',
    selectOptions: formData.groundWorks.selectOptions || '',
    gwLength: formData.groundWorks.gwLength || '',
    gwWidth: formData.groundWorks.gwWidth || '',
    gwDepth: formData.groundWorks.gwDepth || '',
    ductingSize: formData.groundWorks.ductingSize || '',
    ductingLength: formData.groundWorks.ductingLength || '',
    groundWorksDescription: formData.groundWorks.groundWorksDescription || ''
  };
  if (edit && formData.hasOwnProperty('id')) {
    const idObj = { id: formData.id };
    postData = { ...idObj, ...postData };
  }

  return postData;

};

const UserAvatar: React.FC<UserAvatarProps> = ({ src, name }) => (
  <div className="flex flex-col flex-1 justify-center p-1 text-xs leading-4 whitespace-nowrap rounded-2xl border border-solid border-slate-200 text-neutral-900">
    <div className="flex gap-2">
      <Image
        loading="lazy"
        src={src}
        alt={`${name}'s avatar`}
        className="shrink-0 w-6 rounded-full aspect-square"
        width={20}
        height={20}
      />
      <div className="grow my-auto">{name}</div>
    </div>
  </div>
);

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  name,
  type,
  onChange,
}) => (
  <div className="flex flex-col grow px-5 m-2 text-base font-semibold text-neutral-700 max-md:mt-10">
    <label className="text-left">{label}</label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="justify-center items-start py-7 pr-16 pl-6 mt-3.5 text-sm leading-4 whitespace-nowrap bg-stone-50 rounded-[60px] text-black max-md:px-5"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default function Page({ params }: { params: { slug: string } }) {

  const [users, setUsers] = useState<User[]>([]);
  const [userData, setUserData] = useState<any>();
  const [status, setStatus] = useState<Status>('Sent');
  const [sslId, setSslId] = useState(null as number | null)

  const [isNew, setIsNew] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authAxios.get<User[]>('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };


    fetchUsers();
  }, []);


  useEffect(() => {
    const fetchData = async () => {


      if (params.slug) {

        setIsNew(false);
        if (params.slug[0] == 'edit') {
          setIsEdit(true)
        }
        else if (params.slug[0] == 'view') {
          setIsView(true)
        }
        else {
          setIsNew(true)
        }
        console.log("action params", params.slug[0])
        console.log("id params", params.slug[1])
        setSslId(parseInt(params.slug[1]))

        const response = await authAxios.get(`/api/ssl?id=${params.slug[1]}`);


        const postData = mapPostDataToState(response.data);

        setAddress(postData.address);
        setChargeInfo(postData.chargeInfo);
        setElectricalSetup(postData.electricalSetup);
        setInstallationSetup(postData.installationSetup);
        setGroundWorks(postData.groundWorks)

        console.log("respone", postData);


      } else {

      }
    }
    setUserData(localStorage.getItem('userData'))
    fetchData();


  }, [params])





  const handleSubmit = async () => {

    const newData = { address, chargeInfo, installationSetup, groundWorks, electricalSetup, status: status };

    const storedUserData = localStorage.getItem("userData");
    let parsedUserData;

    if (storedUserData) {
      parsedUserData = JSON.parse(storedUserData);
      console.log(parsedUserData);
    }
    else {
      return;
    }
    const sentData = mapStateToPostData(newData, true, parsedUserData?.id)

    try {

      if (isNew) {

        const response = await authAxios.post('/api/ssl', sentData, {
          headers: {
            // 'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log("done saving", response.status);
      }

      if (isEdit) {

        const response = await authAxios.put('/api/ssl', { ...sentData, id: sslId }, {
          headers: {
            // 'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log("done editing", response.status);

      }

      handleClick()

      setAddress({
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        country: "",
        postCode: "",
        city: ""
      });

      setChargeInfo({
        noAcPoints: 0,
        noDcPoints: 0,
        makeOfChargePoint: "",
        ampsPerCp: "",
        kwPerCp: "",
        wallMountSingle: "",
        wallMountDual: "",
        floorMountSingle: "",
        floorMountDual: "",
      });

      setElectricalSetup({
        phaseType: "",
        mainsFuseSize: 0,
        mainsIsolation: "",
        earthingSetup: "",
        mobileSignal: "",
        signalStrength: "",
        consumerUnitMake: "",
        consumerUnitModel: "",
        totalSpareWays: "",
        totalAmpsInUse: "",
      });

      setInstallationSetup(
        {
          cableSizeRead: "",
          cableLengthTotal: "",
          totalCableRuns: "",
          internalCableAttachment: "",

          installationEarthingSetup: "",
          dataCableRun: "",
          cableRunDescription: "",
        },
      );

      setGroundWorks({
        selectOptions: "",
        gwLength: "",
        gwWidth: "",
        gwDepth: "",
        ductingSize: "",
        ductingLength: "",
        groundWorksDescription: "",
      });


    } catch (error) {
      console.error('Error sending data:', error);
    }


  }



  const [address, setAddress] = useState<AddressDetail>({
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    country: "",
    postCode: "",
    city: ""
  });

  const [chargeInfo, setChargeInfo] = useState<ChargeInfo>({
    noAcPoints: 0,
    noDcPoints: 0,
    makeOfChargePoint: "",
    ampsPerCp: "",
    kwPerCp: "",
    wallMountSingle: "",
    wallMountDual: "",
    floorMountSingle: "",
    floorMountDual: "",
  });

  const [electricalSetup, setElectricalSetup] = useState<ElectricalSetup>({
    phaseType: "",
    mainsFuseSize: 0,
    mainsIsolation: "",
    earthingSetup: "",
    mobileSignal: "",
    signalStrength: "",
    consumerUnitMake: "",
    consumerUnitModel: "",
    totalSpareWays: "",
    totalAmpsInUse: "",
  });

  const [installationSetup, setInstallationSetup] = useState<InstallationSetup>(
    {
      cableSizeRead: "",
      cableLengthTotal: "",
      totalCableRuns: "",
      internalCableAttachment: "",
      installationEarthingSetup: "",
      dataCableRun: "",
      cableRunDescription: "",
    },
  );

  const [groundWorks, setGroundWorks] = useState<GroundWorks>({
    selectOptions: "",
    gwLength: "",
    gwWidth: "",
    gwDepth: "",
    ductingSize: "",
    ductingLength: "",
    groundWorksDescription: "",
  });

  // Handlers for updating state of each section
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };




  const handleChargeInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumericField = ["noDcPoints", "noAcPoints", "wallMountSingle", "wallMountDual", "floorMountSingle", "floorMountDual"].includes(name);

    let numericValue: number | undefined | string = undefined
    if (isNumericField) {
      numericValue = parseFloat(value);
    }
    else {
      numericValue = value
    }

    setChargeInfo(prevState => ({
      ...prevState,
      [name]: numericValue
    }));
  };



  const handleElectricalSetupChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // const { name, value } = e.target;
    // setElectricalSetup((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));

    const { name, value } = e.target;
    const isNumericField = ["mainsFuseSize"].includes(name);

    let numericValue: number | undefined | string = undefined
    if (isNumericField) {
      numericValue = parseFloat(value);
    }
    else {
      numericValue = value
    }

    setElectricalSetup(prevState => ({
      ...prevState,
      [name]: numericValue
    }));


  };

  const handleInstallationSetupChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setInstallationSetup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGroundWorksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGroundWorks((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const makeOfChargePointOptions = ["ABB", "Easee", "Proj", " EV", "Other"];
  const kwPerCpOption = ["AC 7kw", "AC 22kw", "AC 25kw", "AC 40kw", "AC 75kw", "AC 100kw", "AC 200kw", "Other"];
  const phaseTypeOption = ["Single Phase", "3 Phase"];
  const mainsIsolationOption = ["Yes", "No"];
  const earthingSetupOption = ["TT", "PME", "PEN", "N/A"];
  const mobileSignalOption = ["5G", "4G", "3G"];
  const signalStrengthOptionOption = ["5", "4", "3", "2", "1"];
  const installationEarthingSetupOption = ["TT", "PME", "PEN", "N/A"];
  const selectOptions = ["Terrane", "Concrete", "Tarmac", "Blocks", "Slabs", "Other"];




  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };





  return (
    <>
      <div className="max-w-7xl">

        <div>
          <Button onClick={handleClick}>Open Snackbar</Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              SS1 Form Crated Successfully
            </Alert>
          </Snackbar>
        </div>

        <div className="flex flex-col items-start px-5 max-w-[683px] mb-5">
          <h1 className="self-stretch w-full text-2xl font-semibold text-neutral-900 max-md:max-w-full">
            AFTERSALES INFORMATION SHEET
          </h1>
          <p className="self-stretch mt-7 w-full text-base leading-5 text-neutral-400 max-md:max-w-full">
            Please ensure you understand and keep this document as it will help
            you understand your contract warranties and things users can try
            should a problem arise.
          </p>
          {/* <div className="flex gap-5 justify-between mt-8 text-xs leading-4">
            <div className="my-auto text-zinc-600">Created by</div>
            <UserAvatar
              src="/avatar2.png"
              name="Heram Lan"
            />
          </div>

        */}
          <div className="flex gap-5 justify-between mt-4">
            <div className="grow my-auto text-xs leading-4 whitespace-nowrap text-zinc-600">
              Assigned to
            </div>
            <div className="flex flex-auto gap-2">
              <UsersDropdown users={users} />
            </div>
          </div>

          {/* <div className="flex gap-5 items-center justify-between mt-5 text-xs leading-4 bg-white">
            <div className="text-zinc-600 mr-5 min-w-16">Assigned To</div>
            <div className="relative flex items-center justify-center">
              <select className="appearance-none py-1 min-w-40  min-h-10  rounded-full pr-8 pl-4 border bg-white border-gray-300  text-neutral-900">
                <option value="sent">Brook</option>
                <option value="under_review">Naol</option>
                <option value="save">Semir</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 top-1  pointer-events-none">
                <Image
                  src={"/dropArrow.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className="w-4 h-4 fill-current text-gray-500"

                />
              </div>
            </div>
          </div> */}


          <div className="flex gap-5 items-center justify-between mt-5 text-xs leading-4 bg-white">
            <div className="text-zinc-600 mr-5 min-w-16">Status</div>
            <div className="relative flex items-center justify-center">
              <select className="appearance-none py-1 min-w-40  min-h-10  rounded-full pr-8 pl-4 border bg-white border-gray-300  text-neutral-900">
                <option value="sent">Sent</option>
                <option value="under_review">Under Review</option>
                <option value="save">Save</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 top-1  pointer-events-none">
                <Image
                  src={"/dropArrow.svg"}
                  alt=""
                  width={20}
                  height={20}
                  className="w-4 h-4 fill-current text-gray-500"

                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="font-bold text-3xl my-5">Address Details:</h2>
        <div className="flex h-[100%] gap-5 flex-col max-md:gap-0">
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  max-md:ml-0 max-md:w-full">
            <InputField
              label="Address 1"
              type="text"
              name="address1"
              value={address.address1}
              onChange={handleAddressChange}
              placeholder="Address 1"
            />
            <InputField
              label="Address 2"
              type="text"
              name="address2"
              value={address.address2}
              onChange={handleAddressChange}
              placeholder="Address 2"
            />
            <InputField
              label="Address 3"
              type="text"
              name="address3"
              value={address.address3}
              onChange={handleAddressChange}
              placeholder="Address 3"
            />
            <InputField
              label="Address 4"
              type="text"
              name="address4"
              value={address.address4}
              onChange={handleAddressChange}
              placeholder="Address 4"
            />
            <InputField
              label="Country"
              type="text"
              name="country"
              value={address.country}
              onChange={handleAddressChange}
              placeholder="Country"
            />
            <InputField
              label="City"
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              placeholder="City"
            />
            <InputField
              label="Post Code"
              type="text"
              name="postCode"
              value={address.postCode}
              onChange={handleAddressChange}
              placeholder="Post Code"
            />
          </div>
        </div>

        <h2 className="font-bold text-3xl my-5">Charger Info::</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  max-md:ml-0 max-md:w-full">
          <InputField
            label="No. of AC Points"
            type="number"
            name="noAcPoints"
            value={chargeInfo.noAcPoints}
            onChange={handleChargeInfoChange}
            placeholder="No. of AC Points"
          />

          <InputField
            label="No. of DC Points"
            type="number"
            name="noDcPoints"
            value={chargeInfo.noDcPoints}
            onChange={handleChargeInfoChange}
            placeholder="No. of DC Points"
          />


          <DynamicSelect
            title="Make of Charge Point"
            options={makeOfChargePointOptions}
            value={chargeInfo.makeOfChargePoint}
            onChange={(value: any) => handleChargeInfoChange({ target: { name: 'makeOfChargePoint', value } } as React.ChangeEvent<HTMLInputElement>)}
          />


          <InputField
            label="Amps Per CP"
            type="text"
            name="ampsPerCp"
            value={chargeInfo.ampsPerCp}
            onChange={handleChargeInfoChange}
            placeholder="Amps Per CP"
          />



          <DynamicSelect
            title="KW Per CP"
            options={kwPerCpOption}
            value={chargeInfo.kwPerCp}
            onChange={(value: any) => handleChargeInfoChange({ target: { name: 'kwPerCp', value } } as React.ChangeEvent<HTMLInputElement>)}
          />


          <InputField
            label="Wall Mount Single"
            type="text"
            name="wallMountSingle"
            value={chargeInfo.wallMountSingle}
            onChange={handleChargeInfoChange}
            placeholder="Wall Mount Single"
          />

          <InputField
            label="Wall Mount Dual"
            type="text"
            name="wallMountDual"
            value={chargeInfo.wallMountDual}
            onChange={handleChargeInfoChange}
            placeholder="Wall Mount Dual"
          />

          <InputField
            label="Floor Mount Single"
            type="text"
            name="floorMountSingle"
            value={chargeInfo.floorMountSingle}
            onChange={handleChargeInfoChange}
            placeholder="Floor Mount Single"
          />

          <InputField
            label="Floor Mount Dual"
            type="text"
            name="floorMountDual"
            value={chargeInfo.floorMountDual}
            onChange={handleChargeInfoChange}
            placeholder="Floor Mount Dual"
          />
        </div>

        <h2 className="font-bold text-3xl my-5">Site Electrical Set Up:</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  max-md:ml-0 max-md:w-full">

          <DynamicSelect
            title="Phase Type"
            options={phaseTypeOption}
            value={electricalSetup.phaseType}
            onChange={(value: any) => handleElectricalSetupChange({ target: { name: 'phaseType', value } } as React.ChangeEvent<HTMLInputElement>)}
          />


          <InputField
            label="Mains Fuse Size"
            type="number"
            name="mainsFuseSize"
            value={electricalSetup.mainsFuseSize.toString()}
            onChange={handleElectricalSetupChange}
            placeholder="Mains Fuse Size"
          />


          <DynamicSelect
            title="Mains Isolation"
            options={mainsIsolationOption}
            value={electricalSetup.mainsIsolation}
            onChange={(value: any) => handleElectricalSetupChange({ target: { name: 'mainsIsolation', value } } as React.ChangeEvent<HTMLInputElement>)}
          />

          <DynamicSelect
            title="Earthing Setup"
            options={earthingSetupOption}
            value={electricalSetup.earthingSetup}
            onChange={(value: any) => handleElectricalSetupChange({ target: { name: 'earthingSetup', value } } as React.ChangeEvent<HTMLInputElement>)}
          />


          <DynamicSelect
            title="Mobile Signal"
            options={mobileSignalOption}
            value={electricalSetup.mobileSignal}
            onChange={(value: any) => handleElectricalSetupChange({ target: { name: 'mobileSignal', value } } as React.ChangeEvent<HTMLInputElement>)}
          />

          <InputField
            label="Signal Strength"
            type="text"
            name="signalStrength"
            value={electricalSetup.signalStrength}
            onChange={handleElectricalSetupChange}
            placeholder="Signal Strength"
          />

          <DynamicSelect
            title="Signal Strength"
            options={signalStrengthOptionOption}
            value={electricalSetup.signalStrength}
            onChange={(value: any) => handleElectricalSetupChange({ target: { name: 'signalStrength', value } } as React.ChangeEvent<HTMLInputElement>)}
          />

          <InputField
            label="Consumer Unit Make"
            type="text"
            name="consumerUnitMake"
            value={electricalSetup.consumerUnitMake}
            onChange={handleElectricalSetupChange}
            placeholder="Consumer Unit Make"
          />

          <InputField
            label="Consumer Unit Model"
            type="text"
            name="consumerUnitModel"
            value={electricalSetup.consumerUnitModel}
            onChange={handleElectricalSetupChange}
            placeholder="Consumer Unit Model"
          />

          <InputField
            label="Total Spare Ways"
            type="text"
            name="totalSpareWays"
            value={electricalSetup.totalSpareWays}
            onChange={handleElectricalSetupChange}
            placeholder="Total Spare Ways"
          />

          <InputField
            label="Total Amps In Use"
            type="text"
            name="totalAmpsInUse"
            value={electricalSetup.totalAmpsInUse}
            onChange={handleElectricalSetupChange}
            placeholder="Total Amps In Use"
          />
        </div>
        <h2 className="font-bold text-3xl my-5">Installation Set Up</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  max-md:ml-0 max-md:w-full">
          <InputField
            label="Cable Size Read (mm)"
            type="text"
            name="cableSizeRead"
            value={installationSetup.cableSizeRead}
            onChange={handleInstallationSetupChange}
            placeholder="Cable Size Read (mm)"
          />

          <InputField
            label="Cable Length Total (meter)"
            type="text"
            name="cableLengthTotal"
            value={installationSetup.cableLengthTotal}
            onChange={handleInstallationSetupChange}
            placeholder="Cable Length Total (meter)"
          />

          <InputField
            label="Total Cable Runs"
            type="text"
            name="totalCableRuns"
            value={installationSetup.totalCableRuns}
            onChange={handleInstallationSetupChange}
            placeholder="Total Cable Runs"
          />

          <InputField
            label="Internal Cable Attachment"
            type="text"
            name="internalCableAttachment"
            value={installationSetup.internalCableAttachment}
            onChange={handleInstallationSetupChange}
            placeholder="Internal Cable Attachment"
          />


          <DynamicSelect
            title="Earthing Setup"
            options={installationEarthingSetupOption}
            value={installationSetup.installationEarthingSetup}
            onChange={(value: any) => handleInstallationSetupChange({ target: { name: 'installationEarthingSetup', value } } as React.ChangeEvent<HTMLInputElement>)}
          />


          <InputField
            label="Data Cable Run"
            type="text"
            name="dataCableRun"
            value={installationSetup.dataCableRun}
            onChange={handleInstallationSetupChange}
            placeholder="Data Cable Run"
          />

          <InputField
            label="Cable Run Description"
            type="text"
            name="cableRunDescription"
            value={installationSetup.cableRunDescription}
            onChange={handleInstallationSetupChange}
            placeholder="Cable Run Description"
          />
        </div>
        <h2 className="font-bold text-3xl my-5">Ground Works</h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  max-md:ml-0 max-md:w-full">


          <DynamicSelect
            title="Select Options"
            options={selectOptions}
            value={groundWorks.selectOptions}
            onChange={(value: any) => handleGroundWorksChange({ target: { name: 'selectOptions', value } } as React.ChangeEvent<HTMLInputElement>)}
          />

          <InputField
            label="GW Length (meters)"
            type="text"
            name="gwLength"
            value={groundWorks.gwLength}
            onChange={handleGroundWorksChange}
            placeholder="GW Length (meters)"
          />

          <InputField
            label="GW Width (mm)"
            type="text"
            name="gwWidth"
            value={groundWorks.gwWidth}
            onChange={handleGroundWorksChange}
            placeholder="GW Width (mm)"
          />

          <InputField
            label="GW Depth (mm)"
            type="text"
            name="gwDepth"
            value={groundWorks.gwDepth}
            onChange={handleGroundWorksChange}
            placeholder="GW Depth (mm)"
          />

          <InputField
            label="Ducting Size"
            type="text"
            name="ductingSize"
            value={groundWorks.ductingSize}
            onChange={handleGroundWorksChange}
            placeholder="Ducting Size"
          />

          <InputField
            label="Ducting Length (meters)"
            type="text"
            name="ductingLength"
            value={groundWorks.ductingLength}
            onChange={handleGroundWorksChange}
            placeholder="Ducting Length (meters)"
          />

          <InputField
            label="Ground Works Description"
            type="text"
            name="groundWorksDescription"
            value={groundWorks.groundWorksDescription}
            onChange={handleGroundWorksChange}
            placeholder="Ground Works Description"
          />
        </div>
      </div>

      <div className="flex w-full justify-end items-end">
        <button
          onClick={handleSubmit}
          disabled={isView}
          type="submit"
          className="justify-center items-center self-end px-16 py-4 mt-16 max-w-full text-xl leading-6 text-center text-white bg-[#69BE94] rounded-[50px] w-[354px] max-md:px-5 max-md:mt-10"
        >
          Confirm
        </button>
      </div>
    </>
  );
};

// export default Ssl;








