'use client';

import { IRegister } from '@/interfaces/productoInterface';
import { formRegister } from '@/Helpers/auth';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';
import registerValidation from '../../Helpers/validateRegister';
import '@fortawesome/fontawesome-free/css/all.min.css';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState<{ [key in keyof IRegister]?: boolean }>({});
    const togglePasswordVisibility = (field: keyof IRegister) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const router = useRouter();

    const initialState: IRegister = {
        name: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        confirmPassword: "",
    };

    const [userData, setUserData] = useState<IRegister>(initialState);
    const [errors, setErrors] = useState<Partial<IRegister>>({});

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleBlur = (name: keyof IRegister) => {
        const validationErrors = registerValidation(userData);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validationErrors[name],
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        registerValidation(userData);

        try {
            const response = await formRegister(userData);
            if (response) {
                Swal.fire({
                    title: 'Registered successfully',
                    icon: 'success',
                    timer: 1000,
                });
                router.push("/login");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    timer: 2000,
                });
                throw new Error(error.message)
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'An unknown error occurred',
                    icon: 'error',
                    timer: 2000,
                });
            }
        }
    };

    const renderInput = (type: string, name: keyof IRegister, label: string) => (
        <div className="w-4/5 h-14 mb-6 relative">
            <input
                type={type}
                name={name}
                value={userData[name]}
                onChange={handleChange}
                onBlur={() => handleBlur(name)}
                className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                required
            />
            <label
                htmlFor={name}
                className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${userData[name] ? 'top-[4px] text-xs' : ''}`}
            >
                {label}
            </label>
            {errors[name] && (<p className='text-red-600 text-xs'>{errors[name]}</p>)}
        </div>
    );

    const renderPasswordInput = (name: keyof IRegister, label: string) => (
        <div className="w-4/5 h-14 mb-6 relative">
            <input
                type={showPassword[name] ? 'text' : 'password'}
                name={name}
                value={userData[name]}
                onChange={handleChange}
                onBlur={() => handleBlur(name)}
                className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                required
            />
            <label
                htmlFor={name}
                className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${userData[name] ? 'top-[4px] text-xs' : ''}`}
            >
                {label}
            </label>
            <i
                className={`fas ${showPassword[name] ? 'fa-eye-slash' : 'fa-eye'}`}
                onClick={() => togglePasswordVisibility(name)}
                style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: 'black'
                }}
            ></i>
            {errors[name] && (<p className='text-red-600 text-xs'>{errors[name]}</p>)}
        </div>
    );

    return (
        <div className="absolute inset-0 w-full flex flex-col items-center justify-center m-auto min-h-screen bg-primary lg:w-2/3 2xl:w-1/2 2xl:relative 2xl:h-screen">
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <h1 className='w-full text-xl text-center text-neutral-800 font-extrabold'>JOIN THE FELLINI CLUB</h1>
                {renderInput("text", "name", "Name")}
                {renderInput("email", "email", "Email")}
                {renderInput("text", "phone", "Phone")}
                {renderInput("text", "address", "Address")}
                {renderPasswordInput("password", "Password")}
                {renderPasswordInput("confirmPassword", "Confirm Password")}

                <button
                    type="submit"
                    className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Register
                </button>
                <Link href="/login" className='text-neutral-800 mt-2 hover:underline'>Do you already have an account? Login</Link>
                <p className='text-neutral-800'>Or:</p>
                <div className="w-1/2 mt-2 flex items-center">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full bg-white text-neutral-700 font-bold py-2 rounded-lg flex items-center justify-center hover:bg-neutral-100 transition duration-200"
                    >
                        <div className='w-auto px-2'>
                            <Image src="/assets/icon/google.png" width={30} height={30} alt="google" className="mr-2" />
                        </div>
                        <span className="flex-grow text-center">Continue with Google</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
