'use client';
import React, { useEffect, useState } from 'react';
import AfterSaleCard from './AfterSaleCard';
import CardSsOne from './SsOneCard';
import { useRouter } from 'next/navigation';
import authAxios from '@/utils/axiosWithAxios';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import {
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Box,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SkeletonSSLForm from '@/components/skeleton/sslSkeleton';
// import './module.dashboard.css';
interface Compliance {
    id: number;
    serialNumber: string;
    compliant: boolean;
    manufacturerName: string;
    chargePointLocation: string;
    makeAndModel: string;
    softwareVersion: string;
    installationDate: string;
    aftersaleId: number;
}

interface AfterSale {
    id: number;
    createdById: number;
    assignedToId: number;
    status: string;
    clientDetail: string;
    eccJobReference: string;
    installationAddress: string;
    softwareProvider: string;
    payToChargeProvider: string;
    installationWarranty: string;
    hardwareWarranty: string;
    serviceMaintenanceContract: string;
    signature: string;
    compliances: Compliance[];
}

export interface SSLFormDto {
    id: number;
    createdById: number;
    assignedToId: number;
    status: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    city: string;
    country: string;
    postCode: string;
    noAcPoints: number;
    noDcPoints: number;
    makeOfChargePoint: string;
    ampsPerCp: string;
    kwPerCp: string;
    wallMountSingle: number;
    wallMountDual: number;
    floorMountSingle: number;
    floorMountDual: number;
    phaseType: string;
    mainsFuseSize: string;
    mainsIsolation: string;
    earthingSetup: string;
    mobileSignal: string;
    signalStrength: string;
    consumerUnitMake: string;
    consumerUnitModel: string;
    totalSpareWays: string;
    totalAmpsInUse: string;
    cableSizeRead: string;
    cableLengthTotal: string;
    totalCableRuns: string;
    internalCableAttachment: string;
    dataCableRun: string;
    cableRunDescription: string;
    selectOptions: string;
    gwLength: string;
    gwWidth: string;
    gwDepth: string;
    ductingSize: string;
    ductingLength: string;
    groundWorksDescription: string;
    installationEarthingSetup: string;
    createdAt: string;
    updatedAt: string;
}

interface UserDTO {
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
    profileImageUrl: string | null;
}

const Page: React.FC = () => {
    const [AfterSaleData, setAfterSaleData] = useState<AfterSale[]>([]);
    const [SslData, setSslData] = useState<SSLFormDto[]>([]);
    const [reload, seReload] = useState(false);
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [isOpen, setIsOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Default avatar image URL
    const defaultAvatarUrl = '/avatar.jpg';

    const allStatus = ['Sent', 'Under Review', 'Save'];

    const [selectedUser, setSelectedUser] = useState<UserDTO>({
        id: session?.user.id as number,
        email: session?.user.email as string,
        name: session?.user.name as string,
        phoneNumber: session?.user.phoneNumber as string,
        profileImageUrl: session?.user.profileImageUrl as string | null,
    });

    const handleStatusChange = (event: string) => {
        setStatus(event);
    };

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEmail = event.target.value;
        const selectedUser = users.find((user) => user.email === selectedEmail);
        if (selectedUser) {
            setSelectedUser(selectedUser);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await authAxios.get('/api/users');
            const data = response.data;
            if (Array.isArray(data) && data.length > 0) {
                setUsers(data);
                if (!selectedUser) {
                    setSelectedUser(data[0]);
                }
            } else {
                console.error('Invalid user data received:', data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchData = async () => {
        if (session === null) return;
        const user = session.user;

        try {
            const [sslResponse, afterSaleResponse] = await Promise.all([
                authAxios.get(`/api/ssl/get-my-ssl?id=${selectedUser?.id}`, {}),
                authAxios.get(
                    `/api/aftersale/get-my-aftersales?id=${selectedUser?.id}`,
                    {}
                ),
            ]);

            setSslData(sslResponse.data);
            setAfterSaleData(afterSaleResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        setIsLoading(true);
        fetchData();
        setIsLoading(false);
    }, []);

    const router = useRouter();

    const handleUserClick = (user: UserDTO) => {
        setSelectedUser(user);
        setAnchorEl(null);
        setIsUserOpen(false);
    };

    const handleEditSS1 = (index: number, data: any) => {
        console.log(' ss1 edited index is', index);
        router.push(`/ssl/edit/${index}`);

        // navigation.navigate("AddingNavigation" as never, { screen: "SsOne", params: { index, isEditing: true, data } } as never);
    };

    const handleViewSS1 = (index: number, data: any) => {
        console.log(' ss1 edited index is', index);
        router.push(`/ssl/view/${index}`);

        // navigation.navigate("AddingNavigation" as never, { screen: "SsOne", params: { index, isEditing: false, data } } as never);
    };

    const handleDeleteSsl = (id: any) => {
        const storedUserData = localStorage.getItem('userData');
        const token = localStorage.getItem('token');
        let user;

        if (storedUserData) {
            user = JSON.parse(storedUserData);
            console.log('first', user);
        } else {
            return;
        }

        authAxios
            .delete(`/api/ssl?id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                alert('Deletion Successful');
                console.log('Delete successful:', response.data);
                seReload(true);
            })
            .catch((error) => {
                console.error('Error deleting data:', error);
            });

        seReload(false);
    };

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex w-full justify-between'>
                <div className='items-end flex'>
                    <p className='text-5xl font-semibold'>Overview</p>
                </div>
                <div className='justify-end flex items-end'>
                    <div className=''>
                        <p className='text-[#5A5A5A] pl-3'>Filter by Status</p>
                        <div>
                            <div className='relative inline-block text-left'>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    id='dropdownDefaultButton'
                                    data-dropdown-toggle='dropdown'
                                    className='text-black bg-white flex border-[1px] w-52 mx-2 hover:bg-gray-100 focus:ring-4 focus:outline-none  font-medium rounded-3xl text-sm px-5 py-2.5 text-center justify-between items-center '
                                    type='button'
                                >
                                    {status ? (
                                        <div className='flex'>
                                            <span
                                                className={`w-4 h-4 rounded-full bg-[#DC28FA] mr-2`}
                                            ></span>
                                            <p>{status}</p>
                                        </div>
                                    ) : (
                                        'Status'
                                    )}
                                    <svg
                                        className={`w-2.5 h-2.5 ms-3 ${isOpen && 'transform rotate-180'}`}
                                        aria-hidden='true'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 10 6'
                                    >
                                        <path
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='m1 1 4 4 4-4'
                                        />
                                    </svg>
                                </button>
                                {isOpen && (
                                    <div
                                        id='dropdown'
                                        className='text-black bg-white flex border-[1px] w-56 mx-2 focus:ring-4 focus:outline-none  font-medium rounded-3xl text-sm py-2.5 text-center justify-between items-center absolute top-12 z-40'
                                    >
                                        <ul
                                            className='py-2 text-sm text-black dark:text-white w-full z-0'
                                            aria-labelledby='dropdownDefaultButton'
                                        >
                                            {allStatus.map((status, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        handleStatusChange(
                                                            status
                                                        );
                                                        setIsOpen(false);
                                                    }}
                                                    className='flex items-center hover:bg-gray-100 py-2 z-50 w-full cursor-pointer px-5'
                                                >
                                                    <span
                                                        className={`w-4 h-4 rounded-full ${index == 0 ? 'bg-[#DC28FA]' : index == 1 ? 'bg-green-700' : 'bg-yellow-500'} mr-2`}
                                                    ></span>
                                                    <button className='block flex-1 text-left py-2 text-black  focus:outline-none'>
                                                        {status}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <p className='text-[#5A5A5A] pl-3'>Filter by name</p>
                        <div>
                            <div className='relative inline-block text-left'>
                                <button
                                    onClick={() => setIsUserOpen(!isUserOpen)}
                                    id='dropdownDefaultButton'
                                    data-dropdown-toggle='dropdown'
                                    className='text-black bg-white flex border-[1px] w-52 mx-2 hover:bg-gray-100 focus:ring-4 focus:outline-none  font-medium rounded-3xl text-sm px-5 py-2.5 text-center justify-between items-center '
                                    type='button'
                                >
                                    {selectedUser ? (
                                        <div className='flex'>
                                            <p>{selectedUser.name}</p>
                                        </div>
                                    ) : (
                                        'Un Assigned'
                                    )}
                                    <svg
                                        className={`w-2.5 h-2.5 ms-3 ${isUserOpen && 'transform rotate-180'}`}
                                        aria-hidden='true'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 10 6'
                                    >
                                        <path
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='m1 1 4 4 4-4'
                                        />
                                    </svg>
                                </button>
                                {isUserOpen && (
                                    <div
                                        id='dropdown'
                                        className='bg-white divide-y divide-gray-100 rounded-lg shadow w-52 mt-2 absolute top-12 z-40'
                                    >
                                        <ul
                                            className='py-2 text-sm text-black dark:text-white'
                                            aria-labelledby='dropdownDefaultButton'
                                        >
                                            {users?.map((user) => (
                                                <li
                                                    key={user.id}
                                                    onClick={() =>
                                                        handleUserClick(user)
                                                    }
                                                    className='flex z-50 cursor-pointer hover:bg-slate-200 px-5'
                                                >
                                                    <span className='flex items-center'>
                                                        <Image
                                                            src={
                                                                user.profileImageUrl ||
                                                                defaultAvatarUrl
                                                            }
                                                            width={30}
                                                            height={30}
                                                            className='rounded-full mr-2 h-7 w-7 object-cover'
                                                            alt={user.name}
                                                        />
                                                    </span>
                                                    <p className='block flex-1 text-left py-2 text-black  focus:outline-none'>
                                                        {user.name}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <button className='flex group px-5 font-semibold text-xl py-2 bg-active text-white hover:bg-white border-active border-2 hover:text-active rounded-md duration-100'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width={32}
                                height={31}
                                fill='none'
                            >
                                <path
                                    className='group-hover:fill-active fill-white'
                                    d='M9.392 15.5a.968.968 0 0 1 .968-.969h4.512V10.02a.969.969 0 0 1 1.938 0v4.511h4.511a.968.968 0 1 1 0 1.938H16.81v4.512a.969.969 0 1 1-1.938 0v-4.512H10.36a.969.969 0 0 1-.968-.969Z'
                                />
                                <path
                                    className='group-hover:fill-active fill-white'
                                    fillRule='evenodd'
                                    d='M9.792 4.868a54.9 54.9 0 0 1 12.098 0c2.36.264 4.265 2.122 4.541 4.495a52.724 52.724 0 0 1 0 12.275c-.278 2.373-2.183 4.23-4.541 4.495-4.02.446-8.078.446-12.098 0-2.36-.265-4.265-2.122-4.542-4.495a52.833 52.833 0 0 1 0-12.275c.277-2.373 2.183-4.231 4.542-4.495Zm11.883 1.925a52.96 52.96 0 0 0-11.669 0 3.211 3.211 0 0 0-2.832 2.796 50.895 50.895 0 0 0 0 11.824 3.21 3.21 0 0 0 2.832 2.795c3.845.43 7.824.43 11.67 0a3.211 3.211 0 0 0 2.83-2.795c.46-3.928.46-7.896 0-11.824a3.211 3.211 0 0 0-2.83-2.794'
                                    clipRule='evenodd'
                                />
                            </svg>
                            Create New Task
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <span>
                    <Image
                        src='/target_icon.png'
                        alt='target icon besides user name'
                        height={32}
                        width={32}
                    />
                </span>
                <span className='text-2xl font-semibold ml-4'>
                    {selectedUser?.name}
                </span>
            </div>
            <div className='flex gap-0 justify-between max-w-[364px] items-start pb-3.5 border-b border-solid border-zinc-200'>
                <div className='flex flex-1 gap-1.5 pr-20 font-medium text-black'>
                    <div className='shrink-0 my-auto w-2 h-2 bg-fuchsia-500 rounded-full' />
                    <div className='text-sm'>SSL </div>
                </div>
                <div className='flex justify-center items-center bg-white rounded-2xl'>
                    <img
                        loading='lazy'
                        src='/plus.svg'
                        className='w-5 h-5 aspect-square'
                    />
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-5 max-w-screen-xl'>
                {isLoading
                    ? [...Array(2)].map((_, index) => (
                          <div key={index}>
                              <SkeletonSSLForm />
                          </div>
                      ))
                    : SslData.filter((ss: SSLFormDto) =>
                          ss.status.includes(status)
                      ).map((ss: SSLFormDto, index: number) => (
                          <div key={index}>
                              <CardSsOne
                                  actionText={ss?.status}
                                  address1={ss.address1}
                                  address2={ss.address2}
                                  address3={ss.address3}
                                  title={'SSL'}
                                  key={index}
                                  subtitle={ss.makeOfChargePoint}
                                  handlePress={() => handleEditSS1(ss.id, ss)}
                                  handleSslDelete={() => handleDeleteSsl(ss.id)}
                                  handleViewSS1={() => handleViewSS1(ss.id, ss)}
                              />
                          </div>
                      ))}
            </div>
            <div>
                {SslData.filter((ss: SSLFormDto) => ss.status.includes(status))
                    .length === 0 &&
                    !isLoading && (
                        <div className='flex flex-col items-center justify-center w-full h-96'>
                            <Image
                                src='/ecc_car.png'
                                alt='empty'
                                width={200}
                                height={200}
                            />
                            <p className='text-lg font-semibold mt-5'>
                                No ssl found under {selectedUser.name}
                            </p>
                        </div>
                    )}
            </div>

            <div className='flex gap-0 justify-between max-w-[364px] items-start pb-3.5 border-b border-solid border-zinc-200'>
                <div className='flex flex-1 gap-1.5 pr-20 font-medium text-black'>
                    <div className='shrink-0 my-auto w-2 h-2 bg-yellow-500 rounded-full' />
                    <div className='text-sm'>Aftersale</div>
                </div>
                <div className='flex justify-center items-center bg-white rounded-2xl'>
                    <img
                        loading='lazy'
                        src='/plus.svg'
                        className='w-55 h-5 aspect-square'
                    />
                </div>
            </div>
            <div className='grid  grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 max-w-screen-xl '>
                {isLoading
                    ? [...Array(3)].map((_, index) => (
                          <div key={index}>
                              <SkeletonSSLForm />
                          </div>
                      ))
                    : AfterSaleData.filter((af: any) =>
                          af.status.includes(status)
                      )
                          .map((afterSaleItem) => ({
                              Title: afterSaleItem.clientDetail,
                              Subtitle: afterSaleItem.eccJobReference,
                              Icon1Detail: afterSaleItem.installationAddress,
                              Icon2Detail: afterSaleItem.installationWarranty,
                              Icon3Detail: afterSaleItem.softwareProvider,
                              Flag: afterSaleItem.status,
                          }))
                          .map((item, index) => (
                              <AfterSaleCard item={item} key={index} />
                          ))}
            </div>
            <div>
                {AfterSaleData.filter((af: any) => af.status.includes(status))
                    .length === 0 &&
                    !isLoading && (
                        <div className='flex flex-col items-center justify-center w-full h-96'>
                            <Image
                                src='/ecc_car.png'
                                alt='empty'
                                width={200}
                                height={200}
                            />
                            <p className='text-lg font-semibold mt-5'>
                                No aftersales found under {selectedUser.name}
                            </p>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Page;
