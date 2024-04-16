'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { signIn } from 'next-auth/react';

function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format.');
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

        try {
            setLoading(true);
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/',
            });
            if (result?.error) {
                setLoading(false);
                console.error('An error occurred:', result.error);
            } else {
                router.push('/');
            }
        } catch (error) {
            setLoading(false);
            console.error('An error occurred:', error);
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

            <div className='flex flex-col items-center justify-center h-full'>
                <div className='flex flex-col mt-auto max-w-[505px] w-full mx-auto justify-between'>
                    <div className='flex flex-col text-base '>
                        <h1 className='text-4xl font-bold'>
                            Hi, Welcome back!
                        </h1>
                        <p className='text-[#AEAEAE] mt-3 '>
                            Login now to manage your job made easy.
                        </p>

                        <form
                            className='flex flex-col text-base'
                            onSubmit={handleSubmit}
                        >
                            <div className='mt-8 mb-1 w-full leading-[170%] text-zinc-800 max-md:max-w-full'>
                                Email address
                            </div>
                            <div className='relative flex items-center mx-auto w-[100%]'>
                                <input
                                    onChange={handleEmailChange}
                                    required
                                    type='email'
                                    value={email}
                                    placeholder='Enter your Email address'
                                    className='border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:border-[#69BE94] min-h-[60px] w-[100%]'
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
                                <p className='text-red-500 text-sm'>
                                    {emailError}
                                </p>
                            )}

                            <div className='mt-8 mb-1 w-full leading-[170%] text-zinc-800 max-md:max-w-full'>
                                Password
                            </div>
                            <div className='relative flex items-center mx-auto w-[100%]'>
                                <input
                                    onChange={handlePasswordChange}
                                    required
                                    value={password}
                                    type='password'
                                    placeholder='Enter your password'
                                    className='border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:border-[#69BE94] min-h-[60px] w-[100%]'
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
                                <p className='text-red-500 text-sm '>
                                    {passwordError}
                                </p>
                            )}

                            <div className='flex gap-5 justify-between mt-5 w-full'>
                                <div className='flex flex-1 gap-4 leading-[170%] text-zinc-800'>
                                    <label className='ml-2 text-sm flex justify-center items-center gap-2'>
                                        <input
                                            type='checkbox'
                                            checked={rememberMe}
                                            onChange={handleRememberMeChange}
                                            className='mr-1 bg-[gray] w-5 h-5 cursor-pointer'
                                        />
                                        <span className='text-[#303030]'>
                                            Remember Me
                                        </span>
                                    </label>
                                </div>
                                <div className='flex-1 my-auto font-medium text-end text-[#69BE94] leading-[150%]'>
                                    <p className=' mb-0 '>
                                        <a
                                            href='/forgot'
                                            className='text-[#69BE94] hover:underline'
                                        >
                                            Forgot Password ?
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <button
                                type='submit'
                                className='bg-[#69BE94] p-3 rounded-md mb-5 mt-10 text-[#fff]'
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        <p className='text-center text-[#AEAEAE] mb-0 '>
                            Not registered yet?{' '}
                            <a
                                href='/register'
                                className='text-[#69BE94] hover:underline'
                            >
                                Create an Account
                            </a>
                        </p>
                    </div>
                </div>
                <div className='mt-auto flex justify-center gap-10 self-end text-[#AEAEAE] text-sm pb-10 w-full'>
                    <p>© 2024 ECC. All rights reserved.</p>
                    <p>Terms of Service Privacy Policy</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
