'use client';
import { Alert } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

function Register() {
    const router = useRouter();

    const [rememberMe, setRememberMe] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const [fullNameError, setFullNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!fullName) {
            setFullNameError('Full name must not be empty.');
            return;
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format.');
            return;
        }

        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setPhoneError('Phone number must be in international format.');
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
            );
            return;
        }

        setEmailError('');
        setPasswordError('');
        setFullNameError('');
        setPhoneError('');

        const payload = {
            fullName,
            email,
            phoneNumber,
            password,
        };

        try {
            // Send the data to the server
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Registration successful, handle the response
                console.log('Registration Successful');

                setEmail('');
                setPassword('');
                setPhoneNumber('');
                setFullName('');

                alert(
                    'Registration successful. Please check your email for a verification link.'
                );
            } else {
                // Registration failed, handle the error
                console.error('Registration failed');
            }
        } catch (error) {
            // Handle any network or server errors
            console.error('An error occurred', error);
        }
    };

    return (
        <div className='bg-[#fff] h-screen w-full grid grid-cols-2 max-h-screen'>
            <div className='relative h-full'>
                <Image
                    className='object-cover h-full'
                    src='/register.webp'
                    alt='notification'
                    layout='fill'
                    objectFit='cover'
                    quality={100}
                />
            </div>
            <div className='flex flex-col items-center mt-20 justify-between '>
                <div className='flex flex-col text-base  '>
                    <h1 className='text-4xl font-bold'>
                        Get’s started with ECC
                    </h1>
                    <p className='text-left text-[#AEAEAE] mb-0 mt-2'>
                        Already have an account?{' '}
                        <a
                            href='/login'
                            className='text-[#69BE94] hover:underline'
                        >
                            Log in
                        </a>
                    </p>

                    <form
                        className='flex flex-col text-base max-w-[398px]'
                        onSubmit={handleSubmit}
                    >
                        <div className='mt-8 mb-1 w-full leading-[110%] text-zinc-800 max-md:max-w-full'>
                            Full Name
                        </div>
                        <div className='relative flex items-center mx-auto w-[100%]'>
                            <input
                                required
                                type='text'
                                placeholder='Enter your Full Name'
                                name='fullName'
                                onChange={(e) => setFullName(e.target.value)}
                                className='border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:border-[#69BE94] min-h-[60px] w-[100%] '
                            />
                            <div className='absolute left-2 top-1/2 transform -translate-y-1/2'>
                                <Image
                                    src='/Name.svg'
                                    alt='Email Icon'
                                    width={24}
                                    height={24}
                                    loading='lazy'
                                    className='w-6 h-6'
                                />
                            </div>
                        </div>
                        {fullNameError && (
                            <p className='text-red-500 text-sm'>
                                {fullNameError}
                            </p>
                        )}

                        <div className='mt-8 mb-1 w-full leading-[110%] text-zinc-800 max-md:max-w-full'>
                            Email address
                        </div>
                        <div className='relative flex items-center mx-auto w-[100%]'>
                            <input
                                required
                                type='email'
                                name='email'
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your Email address'
                                className='border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:border-[#69BE94] min-h-[60px] w-[100%] '
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
                        {emailError && (
                            <p className='text-red-500 text-sm'>{emailError}</p>
                        )}

                        <div className='mt-8 mb-1 w-full leading-[110%] text-zinc-800 max-md:max-w-full'>
                            Phone Number
                        </div>
                        <div className='relative flex items-center mx-auto w-[100%]'>
                            <input
                                required
                                type='text'
                                name='phoneNumber'
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder='Enter your Phone Number'
                                className='border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:border-[#69BE94] min-h-[60px] w-[100%] '
                            />
                            <div className='absolute left-2 top-1/2 transform -translate-y-1/2'>
                                <Image
                                    src='/Phone.svg'
                                    alt='Email Icon'
                                    width={24}
                                    height={24}
                                    loading='lazy'
                                    className='w-6 h-6'
                                />
                            </div>
                        </div>
                        {phoneError && (
                            <p className='text-red-500 text-sm'>{phoneError}</p>
                        )}

                        <div className='mt-8 mb-1 w-full leading-[110%] text-zinc-800 max-md:max-w-full'>
                            Password
                        </div>
                        <div className='relative flex items-center mx-auto w-[100%]'>
                            <input
                                required
                                type='password'
                                placeholder='Enter your password'
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}
                                className='border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:border-[#69BE94] min-h-[60px] w-[100%] '
                            />
                            <div className='absolute left-2 top-1/2 transform -translate-y-1/2'>
                                <Image
                                    src='/Lock.svg'
                                    alt='Lock Icon'
                                    width={24}
                                    height={24}
                                    loading='lazy'
                                    className='w-6 h-6'
                                />
                            </div>
                        </div>
                        {passwordError && (
                            <p className='text-red-500 text-sm'>
                                {passwordError}
                            </p>
                        )}

                        <div className='flex gap-5 justify-between mt-5 w-full '>
                            <div className='flex flex-1 leading-[110%] text-zinc-800'>
                                <label className='ml-2 text-sm flex justify-center items-center gap-2 '>
                                    <input
                                        type='checkbox'
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange}
                                        className='mr-1 bg-[gray] w-5 h-5 cursor-pointer'
                                    />
                                    <p className='text-[#303030]'>
                                        By joining I agree to receive emails
                                        from ECC
                                    </p>
                                </label>
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='bg-[#69BE94] p-3 rounded-md mb-5 mt-10 text-[#fff] '
                        >
                            {' '}
                            Continue
                        </button>
                    </form>
                </div>
                <div className=' flex justify-center gap-10 self-end text-[#AEAEAE] text-sm pb-10 w-full'>
                    <p>© 2024 ECC. All rights reserved.</p>
                    <p>Terms of Service Privacy Policy</p>
                </div>
            </div>
        </div>
    );
}

export default Register;
