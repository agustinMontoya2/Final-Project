'use client';

import { ILogin } from '@/interfaces/productoInterface';
import { formLogin } from '@/Helpers/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const LoginForm = () => {
    const router = useRouter();

    const initialState = {
        email: "",
        password: "",
    };

    const [userData, setUserData] = useState<ILogin>(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await formLogin(userData);
            if (response && response.user) {
                localStorage.setItem("userSession", JSON.stringify(response));
                setUserData(userData);
                window.dispatchEvent(new Event("userSessionUpdated"));
                Swal.fire({
                    icon: 'success',
                    title: 'Login successfully',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2500,
                    timerProgressBar: true,
                });
                router.push("/menu");
            } else {
                throw new Error("User not found");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    timer: 2000
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Invalid credentials or user does not exist',
                    icon: 'error',
                    timer: 2000
                });
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const renderInput = (type: string, name: keyof ILogin, label: string) => {
        const isPassword = type === "password";

        return (
            <div className="w-4/5 mb-6 relative">
                <input
                    type={isPassword && !showPassword ? 'password' : 'text'}
                    id={name}
                    name={name}
                    value={userData[name]}
                    onChange={handleChange}
                    className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                    required
                />
                <label
                    htmlFor={name}
                    className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${userData[name] ? 'top-[4px] text-xs' : ''}`}
                >
                    {label}
                </label>
                {isPassword && (
                    <i
                        className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={togglePasswordVisibility}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            color: 'black'
                        }}
                    ></i>
                )}
            </div>
        );
    };

    return (


        <div className="absolute inset-0 w-full h-auto flex flex-col items-center justify-center bg-primary m-auto lg:w-2/3 2xl:w-1/2 2xl:relative 2xl:h-screen">
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <h1 className='w-full text-xl text-center text-neutral-800 font-extrabold'>LOGIN IN FELLINI BAR</h1>
                {renderInput("email", "email", "Email")}
                {renderInput("password", "password", "Password")}
                <Link href={"/requestNewPassword"} className='w-4/5 -mt-5 mb-3 flex justify-start text-sm text-blue-700 hover:underline'>Have you forgotten your password?</Link>
                <button
                    type="submit"
                    className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Login
                </button>
                <Link href="/register" className='text-neutral-800 mt-2 hover:underline'>Don&apos;t have an account? Register</Link>
                <div className="w-full md:w-1/2 mt-2 flex items-center">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-4/5 m-auto bg-white text-neutral-700 font-bold py-2 rounded-lg flex items-center justify-center hover:bg-neutral-100 transition duration-200"
                    >
                        <div className='w-auto px-2'>
                            <Image src="/assets/icon/google.png" width={30} height={30} alt="google" className="mr-2" />
                        </div>
                        <span className="flex-grow text-center">Continue with Google</span>
                    </button>
                </div>
            </form>
            <div className='w-full h-20'></div>
        </div>
    );
}

export default LoginForm;
