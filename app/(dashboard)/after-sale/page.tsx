"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "util";
import authAxios from "@/utils/axiosWithAxios";
import UsersDropdown from "@/components/home/UserDropdown";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface User {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  profileImageUrl: string | null;
}


interface InputFieldProps {
  label: string;
  value: string;
  placeHolder: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface StatementOfCompliance {
  serialNumber: string;
  isCompliant: boolean;
  passCode: string;
  location: string;
  hardwareWarrantyDate: string;
  serviceContractDate: string;
  installationWarrantyDate: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeHolder,
  onChange,
  type = "text",
}) => (
  <div className="flex flex-col grow px-5 m-2 text-base font-semibold text-neutral-700 max-md:mt-10">
    <label className="text-left">{label}</label>
    <input
      type={type}
      placeholder={placeHolder}
      className="justify-center placeholder:font-medium items-start py-7 pr-16 pl-6 mt-3.5 text-sm leading-4 whitespace-nowrap bg-stone-50 rounded-[60px] text-black max-md:px-5 focus:outline-[#69BE94]"
      value={value}
      onChange={onChange}
    />
  </div>
);

interface UserAvatarProps {
  src: string;
  name: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, name }) => (
  <div className="flex flex-col flex-1 justify-center p-1 text-xs leading-4 whitespace-nowrap rounded-2xl border border-solid border-slate-200 text-neutral-900">
    <div className="flex gap-2">
      <Image
        loading="lazy"
        src={src}
        width={20}
        height={20}
        alt={`${name}'s avatar`}
        className="shrink-0 w-6 rounded-full aspect-square"
      />
      <div className="grow my-auto">{name}</div>
    </div>
  </div>
);

const ClientDetailsForm: React.FC = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [clientDetails, setClientDetails] = useState("");
  const [eccJobReference, setEccJobReference] = useState("");
  const [installationAddress, setInstallationAddress] = useState("");
  const [manufacturerName, setManufacturerName] = useState("");
  const [makeAndModel, setMakeAndModel] = useState("");
  const [softwareVersion, setSoftwareVersion] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [statementOfCompliance, setStatementOfCompliance] = useState<
    StatementOfCompliance[]
  >([
    {
      serialNumber: "",
      isCompliant: false,
      passCode: "",
      location: "",
      hardwareWarrantyDate: "",
      serviceContractDate: "",
      installationWarrantyDate: "",
    },
  ]);

  const addAnotherStatement = () => {
    setStatementOfCompliance((prevState) => [
      ...prevState,
      {
        serialNumber: "",
        isCompliant: false,
        passCode: "",
        location: "",
        hardwareWarrantyDate: "",
        serviceContractDate: "",
        installationWarrantyDate: "",
      },
    ]);
  };

  const removeStatementOfCompliance = (indexToRemove: number) => {
    setStatementOfCompliance((prevState) => {
      const newState = [...prevState];
      newState.splice(indexToRemove, 1);
      return newState;
    });
  };

  const handleChange = <K extends keyof StatementOfCompliance>(
    index: number,
    field: K,
    value: StatementOfCompliance[K],
  ) => {
    setStatementOfCompliance((prevState) => {
      const updatedStatements = [...prevState];
      updatedStatements[index][field] = value;
      return updatedStatements;
    });
  };
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

  const assignedUsers = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b4c84bcecc606226901e93e09bd257e97f433ce9c0d1cf5c641f542cd274f696?apiKey=b8538cc22753477b9af929bffaacd9f6&",
      name: "Kelan Arm",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/be3b5e1cc471214ceb91b2b0ea486479db6db9ec1820352eb835d25f447dc02d?apiKey=b8538cc22753477b9af929bffaacd9f6&",
      name: "Melly mile",
    },
  ];


  return (
    <>
      <div className="flex flex-col items-start px-5 max-w-[683px] mb-5">
        <h1 className="self-stretch w-full text-2xl font-semibold text-neutral-900 max-md:max-w-full">
          AFTERSALES INFORMATION SHEET
        </h1>
        <p className="self-stretch mt-7 w-full text-base leading-5 text-neutral-400 max-md:max-w-full">
          Please ensure you understand and keep this document as it will help
          you understand your contract warranties and things users can try
          should a problem arise.
        </p>
        <div className="flex gap-5 justify-between mt-4">
          <div className="grow my-auto text-xs leading-4 whitespace-nowrap text-zinc-600">
            Assigned to
          </div>
          <div className="flex flex-auto gap-2">
            <UsersDropdown users={users} />
          </div>
        </div>

        <div className="flex gap-5 items-center justify-between mt-5 text-xs leading-4 bg-white">
          <div className="text-zinc-600 mr-10">Status</div>
          <div className="relative flex items-center justify-center">
            <select className="appearance-none py-1 pl-2 pr-8 border bg-white border-gray-300 rounded-md text-neutral-900">
              <option value="sent">Sent</option>
              <option value="under_review">Under Review</option>
              <option value="save">Save</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="w-4 h-4 fill-current text-gray-500"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 13.293a1 1 0 0 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414l-3-3a1 1 0 0 0-1.414 1.414L10.586 10 9.293 11.293a1 1 0 0 0 0 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <InputField
              placeHolder="CLIENT DETAILS"
              label="CLIENT DETAILS"
              value={clientDetails}
              onChange={(e) => setClientDetails(e.target.value)}
            />
            <InputField
              placeHolder="ECC JOB REFERENCE"
              label="ECC JOB REFERENCE"
              value={eccJobReference}
              onChange={(e) => setEccJobReference(e.target.value)}
            />
            <InputField
              placeHolder="Installation address"
              label="Installation address"
              value={installationAddress}
              onChange={(e) => setInstallationAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <InputField
              placeHolder="John Smith"
              label="Manufacturer name"
              value={manufacturerName}
              onChange={(e) => setManufacturerName(e.target.value)}
            />
            <InputField
              placeHolder="Make &Model"
              label="Make &Model"
              value={makeAndModel}
              onChange={(e) => setMakeAndModel(e.target.value)}
            />
            <InputField
              placeHolder="Software Version"
              label="Software Version"
              value={softwareVersion}
              onChange={(e) => setSoftwareVersion(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* below section */}

      <div className="flex justify-between my-5">
        <h2 className="text-xl leading-6 text-black font-bold whitespace-nowrap">
          STATEMENT OF COMPLIANCE
        </h2>
      </div>

      <div className="flex flex-col max-w-5xl">
        {statementOfCompliance.map((stmnt, index) => (
          <div key={index} className="w-full max-md:max-w-full ">
            <div className="w-full flex items-end justify-end">
              {index !== 0 && (
                <button
                  onClick={() => removeStatementOfCompliance(index)}
                  className=" bg-white shadow-lg mb-5 mr-6 rounded-full text-[red] mx-5 mt-5"
                >
                  <Image
                    loading="lazy"
                    src="/remove.svg"
                    alt="Add another icon"
                    className="shrink-0 w-5 aspect-[0.95]"
                  />
                </button>
              )}
            </div>

            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <InputField
                  placeHolder="CLIENT DETAILS"
                  label="CLIENT DETAILS"
                  value={stmnt.serialNumber}
                  onChange={(e) =>
                    handleChange(index, "serialNumber", e.target.value)
                  }
                />

                <div className="flex flex-col grow px-5 m-2 text-base font-semibold text-neutral-700 max-md:mt-10">
                  <label className="text-left">Compliant</label>

                  <div className="relative flex items-center justify-center">
                    <select
                      onChange={(e) =>
                        handleChange(
                          index,
                          "isCompliant",
                          e.target.value === "true",
                        )
                      }
                      value={stmnt.isCompliant.toString()}
                      className="w-full justify-center items-start py-7 px-10 mt-3.5 text-sm leading-4 whitespace-nowrap bg-stone-50 rounded-[60px] text-black max-md:px-5"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>

                <InputField
                  placeHolder="Pass Code"
                  label="Pass Code"
                  value={stmnt.passCode}
                  onChange={(e) =>
                    handleChange(index, "passCode", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <h2 className=" ml-6 mb-2 font-semibold max-w-96">
                  SOLUTION WARRANTY AND CONTRACT PERIODS
                </h2>

                <div className="flex flex-col grow px-5 m-2 text-base font-semibold text-neutral-700 max-md:mt-10">
                  <label className="text-left">
                    Hardware warranty (from install date)
                  </label>
                  <div className="relative flex items-center justify-center ">
                    <button
                      className="absolute left-5 top-[35%] shrink-0 aspect-square w-[39px] bg-contain bg-no-repeat"
                      style={{ backgroundImage: "url(/date.svg)" }}
                    />
                    <input
                      placeholder="Valid Until"
                      className="justify-center focus:outline-[#69BE94] items-start py-7 pr-16 pl-20 mr-auto mt-3.5 text-sm leading-4 whitespace-nowrap bg-stone-50 rounded-[60px] text-black max-md:px-5"
                      value={stmnt.hardwareWarrantyDate}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "hardwareWarrantyDate",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col grow px-5 m-2 text-base font-semibold text-neutral-700 max-md:mt-10">
                  <label className="text-left">
                    Service and maintenance contract (Demand Side Response (DSR)
                    agreement if present)
                  </label>
                  <div className="relative flex items-center justify-center ">
                    <button
                      className="absolute left-5 top-[35%] shrink-0 aspect-square w-[39px] bg-contain bg-no-repeat"
                      style={{ backgroundImage: "url(/date.svg)" }}
                    />
                    <input
                      placeholder="Valid Until"
                      className="justify-center focus:outline-[#69BE94] items-start mr-auto py-7 pr-16 pl-20 mt-3.5 text-sm leading-4 whitespace-nowrap bg-stone-50 rounded-[60px] text-black max-md:px-5"
                      value={stmnt.serviceContractDate}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "serviceContractDate",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col grow px-5 m-2 text-base font-semibold text-neutral-700 max-md:mt-10">
                  <label className="text-left">
                    Installation warranty (from install date)
                  </label>
                  <div className="relative flex items-center justify-center ">
                    <button
                      className="absolute left-5 top-[35%] shrink-0 aspect-square w-[39px] bg-contain bg-no-repeat"
                      style={{ backgroundImage: "url(/date.svg)" }}
                    />
                    <input
                      placeholder="Valid Until"
                      className="justify-center focus:outline-[#69BE94] mr-auto items-start py-7 pr-16 pl-20 mt-3.5 text-sm leading-4 whitespace-nowrap bg-stone-50 rounded-[60px] text-black max-md:px-5"
                      value={stmnt.installationWarrantyDate}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "installationWarrantyDate",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addAnotherStatement}
          className="flex gap-4 self-start px-5 ml-7 mt-7 text-base leading-5 text-[#69BE94]"
        >
          <Image
            loading="lazy"
            src="/add.svg"
            width={20}
            height={20}
            alt="Add another icon"
            className="shrink-0 w-5 aspect-[0.95]"
          />
          <span className="my-auto">Add another</span>
        </button>
      </div>

      <div className="flex w-full justify-end items-end">
        <button
          type="submit"
          className="justify-center items-center self-end px-16 py-4 mt-16 max-w-full text-xl leading-6 text-center text-white bg-[#69BE94] rounded-[50px] w-[354px] max-md:px-5 max-md:mt-10"
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default ClientDetailsForm;
