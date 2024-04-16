'use client';

import { Switch } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

const Imager: React.FC<ImageProps> = ({ src, alt, className, ...props }) => (
    <Image src={src} alt={alt} className={className} {...props} />
);

const SettingsPage: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeTab, setActiveTab] = useState('MyDetails');
    const { data: session } = useSession();
    const [profileImage, setProfileImage] = useState(
        session?.user.profileImageUrl || '/avatar.png'
    );
    const [firstName, setFirstName] = useState(
        session?.user.name.split(' ')[0] || ''
    );
    const [lastName, setLastName] = useState(
        session?.user.name.split(' ')[1] || ''
    );
    const [email, setEmail] = useState(session?.user.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [taskUpdate, setTaskUpdate] = useState(false);
    const [taskDeadline, setTaskDeadline] = useState(false);

    console.log('session', session);
    const handleSaveMyDetails = () => {
        console.log('save my details');
    };

    const handleSavePassword = () => {
        console.log('save password');
    };

    const handleSaveNotifications = () => {
        console.log('save Notification', taskDeadline, taskUpdate);
    };

    const handleTabClick = (tab: any) => {
        setActiveTab(tab);
    };

    const handleEditIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result as string);
                const formData = new FormData();
                formData.append('profileImage', file);
                formData.append('userId', session?.user.id.toString() || '1');
                fetch('/api/profile', {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => {
                        if (response.ok) {
                            toast.success('🦄 Wow so easy!', {
                                position: 'bottom-left',
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'light',
                                transition: Bounce,
                            });
                        }
                        // Handle success
                    })
                    .catch((error) => {
                        console.error('Error uploading profile image:', error);
                        // Handle error
                    });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className=''>
            <div className='flex flex-col items-start px-16 gap-12 bg-green-50   max-md:px-5 mb-[100px]'>
                <h1 className='mt-4 ml-3 text-4xl font-medium text-black leading-[68px] max-md:mt-10 max-md:ml-2.5'>
                    Setting
                </h1>

                <div className='relative w-32 h-32 mb-[-60px]'>
                    <input
                        type='file'
                        accept='image/*'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <Image
                        src={profileImage}
                        alt='Profile'
                        width={128}
                        height={128}
                        className='w-full h-full object-cover rounded-full'
                    />
                    <button
                        onClick={handleEditIconClick}
                        className='absolute right-4 bottom-0 w-10 h-10 bg-white rounded-full shadow-md'
                    >
                        <Image
                            src='/Edit.svg'
                            alt='Edit'
                            width={20}
                            height={20}
                            className='w-full h-full'
                        />
                    </button>
                </div>
            </div>

            {/* Tab Section */}

            <div className='flex max-w-md  rounded-t-lg'>
                <button
                    onClick={() => handleTabClick('MyDetails')}
                    className={`py-2 px-4 font-semibold ${activeTab === 'MyDetails' ? 'text-[#69BE94]' : 'text-gray-800'}`}
                >
                    My Details
                </button>
                <button
                    onClick={() => handleTabClick('Password')}
                    className={`py-2 px-4 font-semibold ${activeTab === 'Password' ? 'text-[#69BE94]' : 'text-gray-800'}`}
                >
                    Password
                </button>
                <button
                    onClick={() => handleTabClick('Notifications')}
                    className={`py-2 px-4 font-semibold ${activeTab === 'Notifications' ? 'text-[#69BE94]' : 'text-gray-800'}`}
                >
                    Notifications
                </button>
            </div>
            <div className='max-w-screen-lg  rounded-lg min-h-[450px] '>
                <div className='p-4  h-full'>
                    {activeTab === 'MyDetails' && (
                        <form
                            onSubmit={handleSaveMyDetails}
                            className='flex flex-col px-5 text-sm font-medium max-w-[981px]'
                        >
                            <div className='flex gap-5 self-start max-md:flex-wrap'>
                                <div className='flex flex-col flex-1 grow shrink-0 basis-0 w-fit'>
                                    <label className='text-blue-950'>
                                        First name
                                    </label>
                                    <input
                                        type='text'
                                        required
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        placeholder='First Name'
                                        className='lg:w-[300px] justify-center items-start px-4 py-5 mt-2.5 whitespace-nowrap rounded-lg border focus:outline-none focus:outline-[#69BE94] border-gray-200 border-solid text-slate-500 max-md:pr-5 focus:border-none'
                                    />
                                </div>
                                <div className='flex flex-col flex-1 grow shrink-0 basis-0 w-fit'>
                                    <label className='text-blue-950'>
                                        Last name
                                    </label>
                                    <input
                                        type='text'
                                        required
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        placeholder='Last Name'
                                        className='lg:w-[300px] justify-center items-start px-4 py-5 mt-2.5 whitespace-nowrap rounded-lg border focus:outline-none focus:outline-[#69BE94] border-gray-200 border-solid text-slate-500 max-md:pr-5 focus:border-none'
                                    />
                                </div>
                            </div>
                            <div className='mt-10 mb-3 w-full text-blue-950 max-md:max-w-full'>
                                Email Address
                            </div>

                            <div className='relative flex items-center mx-auto w-[100%]'>
                                <input
                                    required
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder=' Email address'
                                    className='lg:w-[450px] border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:outline-[#69BE94] min-h-[60px] text-slate-500 focus:border-none'
                                />
                                <div className='absolute left-2 top-1/2 transform -translate-y-1/2'>
                                    <Image
                                        src='/email.svg'
                                        alt='Email Icon'
                                        width={24}
                                        height={24}
                                        loading='lazy'
                                        className='w-6 h-6'
                                    />
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='justify-center items-center self-end px-16 py-4 mt-36 max-w-full text-xl leading-6 text-center text-white bg-[#69BE94] rounded-[50px] w-[354px] max-md:px-5 max-md:mt-10'
                            >
                                Save Changes
                            </button>
                        </form>
                    )}
                    {activeTab === 'Password' && (
                        <form
                            onSubmit={handleSavePassword}
                            className='flex flex-col px-5 gap-5 text-sm font-medium max-w-[981px] text-blue-950'
                        >
                            <div className='flex flex-col max-w-lg text-sm font-medium'>
                                <label
                                    htmlFor='password'
                                    className='w-full text-blue-950 max-md:max-w-full'
                                >
                                    Password
                                </label>
                                <input
                                    required
                                    type='password'
                                    id='confirmPassword'
                                    className='justify-center items-start p-5 mt-2.5 w-full text-gray-700 whitespace-nowrap rounded-lg border border-gray-200 border-solid max-md:max-w-full focus:outline-[#69BE94]'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div className='flex flex-col  max-w-lg text-sm font-medium'>
                                <label
                                    htmlFor='confirmPassword'
                                    className='w-full text-blue-950 max-md:max-w-full'
                                >
                                    Confirm Password
                                </label>
                                <input
                                    required
                                    type='password'
                                    id='confirmPassword'
                                    className='justify-center items-start p-5 mt-2.5 w-full text-gray-700 whitespace-nowrap rounded-lg border border-gray-200 border-solid max-md:max-w-full focus:outline-[#69BE94]'
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>

                            <button
                                type='submit'
                                className='justify-center items-center self-end px-16 py-4 mt-36 max-w-full text-xl leading-6 text-center text-white bg-[#69BE94] rounded-[50px] w-[354px] max-md:px-5 max-md:mt-10'
                            >
                                Save Changes
                            </button>
                        </form>
                    )}
                    {activeTab === 'Notifications' && (
                        <div className='flex flex-col items-start max-w-[982px]'>
                            <div className='flex gap-5 px-5 max-w-full items-center justify-center'>
                                <Switch
                                    checked={taskUpdate}
                                    onChange={() => setTaskUpdate(!taskUpdate)}
                                />

                                <div className='flex-auto text-sm font-semibold tracking-tight leading-5 text-gray-900'>
                                    Task Update
                                </div>
                            </div>
                            <div className='flex gap-5 px-5 mt-6 max-w-full  items-center justify-center'>
                                <Switch
                                    checked={taskDeadline}
                                    onChange={() =>
                                        setTaskDeadline(!taskDeadline)
                                    }
                                />

                                <div className='flex-auto text-sm font-semibold tracking-tight leading-5 text-gray-900'>
                                    Task Deadline
                                </div>
                            </div>
                            <button
                                onClick={handleSaveNotifications}
                                type='submit'
                                className='justify-center items-center self-end px-16 py-4 mt-36 max-w-full text-xl leading-6 text-center text-white bg-[#69BE94] rounded-[50px] w-[354px] max-md:px-5 max-md:mt-10'
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
