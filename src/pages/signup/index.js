import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { RiTwitterXFill } from "react-icons/ri";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex items-center w-1/2'>
                <div className='mr-10'>
                    <Image
                        src='/images/Sitting.png'
                        alt='Sitting'
                        width={1920}
                        height={1080}
                        layout='responsive'
                        objectFit='cover'
                    />
                </div>
                <div>
                    <h2 className="text-zinc-800 text-[32px] font-medium font-['Rubik'] mb-4">
                        Sign Up
                    </h2>
                    <div className='mb-4'>
                        <button
                            className=' border px-4 py-2 mb-2 rounded-md shadow-md flex items-center justify-center'
                            style={{ height: "40px", width: "300px" }}
                        >
                            <RiTwitterXFill className='ml-2 mr-1' />
                            <span>Continue with Twitter</span>
                        </button>
                        <button
                            className=' border px-4 py-2 mb-2 rounded-md shadow-md flex items-center justify-center'
                            style={{ height: "40px", width: "300px" }}
                        >
                            <FcGoogle className='ml-2 mr-1' />
                            <span>Continue with Google</span>
                        </button>
                        <div className='flex items-center mb-4 mt-4'>
                            <div className='   shrink basis-0 h-0.5 bg-stone-500 bg-opacity-25 border-t flex-grow'></div>
                            <div className="text-stone-500 text-lg font-normal font-['Rubik'] px-4">
                                OR
                            </div>
                            <div className='   shrink basis-0 h-0.5 bg-stone-500 bg-opacity-25  border-t flex-grow'></div>
                        </div>
                    </div>
                    <form>
                        <div className='mb-4'>
                            <input
                                className='w-full px-3 py-2 border rounded'
                                type='text'
                                id='text'
                                name='text'
                                placeholder='Name'
                                required
                                style={{ height: "40px", width: "150px" }}
                            />
                            <input
                                className='w-full px-3 py-2 border rounded ml-4'
                                type='text'
                                id='text'
                                name='text'
                                placeholder='Surename'
                                required
                                style={{ height: "40px", width: "150px" }}
                            />
                        </div>
                        <div className='mb-4'>
                            <input
                                className='w-full px-3 py-2 border rounded'
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Email address
                  '
                                required
                                style={{ height: "40px", width: "320px" }}
                            />
                        </div>
                        <div className='mb-4 relative'>
                            <input
                                className='w-full px-3 py-2 border rounded'
                                type={showPassword ? "text" : "password"}
                                id='password'
                                name='password'
                                placeholder='Your password'
                                required
                                style={{ height: "40px", width: "320px" }}
                            />

                            <div
                                className='absolute -bottom-1.5 right-1 m-4 cursor-pointer'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <BsEye /> : <BsEyeSlash />}
                            </div>
                        </div>

                        <div>
                            <div className="text-stone-500 text-sm font-normal font-['Rubik'] mt-4">
                                Dont have an account?
                                <Link
                                    href='/signup'
                                    className='text-orange-400 ml-1'
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                        <div className='flex justify-start'>
                            <button
                                className='px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-400'
                                type='submit'
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
