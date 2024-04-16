'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const validPaths = ['setting'];
    const { data: session, status } = useSession();
    const getInitials = (name: string) => {
        const names = name.split(' ');
        const initials = names.map((name) => name[0]).join('');
        return initials;
    };

    const isValidPath = validPaths.includes(pathname);
    const isHelpScreen = pathname === '/help';
    return (
        <nav className={`${isValidPath ? 'bg-black' : 'bg-white'}`}>
            <div className='w-full justify-between flex mx-auto px-4 sm:px-6 lg:px-8 h-28 pb-3 bg-white z-50'>
                <div className='relative my-auto'>
                    <span className='flex absolute left-5 translate-y-1/2'>
                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M17 17L21 21M3 11C3 13.1217 3.84285 15.1566 5.34315 16.6569C6.84344 18.1571 8.87827 19 11 19C13.1217 19 15.1566 18.1571 16.6569 16.6569C18.1571 15.1566 19 13.1217 19 11C19 8.87827 18.1571 6.84344 16.6569 5.34315C15.1566 3.84285 13.1217 3 11 3C8.87827 3 6.84344 3.84285 5.34315 5.34315C3.84285 6.84344 3 8.87827 3 11Z'
                                stroke='#8C97A8'
                                strokeWidth='1.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                        <p className='text-[#8E92BC] font-medium ml-2 text-lg'>
                            Search
                        </p>
                    </span>
                    <input
                        className='h-14 bg-[#F3FAF6] w-[530px] pl-32 rounded-xl outline-[#69BE94]'
                        type='text'
                    />
                </div>
                <div className='flex items-center justify-between space-x-7'>
                    <span className='bg-[#F3FAF6] cursor-pointer p-4 rounded-xl hover:bg-[#ebfcf3]'>
                        <Link href={'/notification'}>
                            <Image
                                src='/notification-filled.svg'
                                alt='notification'
                                width={24}
                                height={24}
                            />
                        </Link>
                    </span>
                    <span
                        className={`${isHelpScreen ? 'bg-[#69BE94]' : 'bg-[#F3FAF6] hover:bg-[#ebfcf3]'} cursor-pointer p-4 rounded-xl `}
                    >
                        <Link href={'/help'}>
                            <Image
                                src={
                                    isHelpScreen
                                        ? '/question-fill-white.svg'
                                        : '/question-fill.svg'
                                }
                                alt='help'
                                width={24}
                                height={24}
                            />
                        </Link>
                    </span>
                    <span className='rounded-full'>
                        <Link href={'/help'}>
                            {session?.user.profileImageUrl ? (
                                <Image
                                    src={session?.user.profileImageUrl}
                                    alt='notification'
                                    width={64}
                                    height={64}
                                />
                            ) : (
                                <div className='flex justify-center items-center rounded-full bg-[#69BE94] font-bold uppercase text-2xl text-white w-16 h-16'>
                                    {session?.user.name
                                        ? getInitials(session.user.name)
                                        : 'N/A'}
                                </div>
                            )}
                        </Link>
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
