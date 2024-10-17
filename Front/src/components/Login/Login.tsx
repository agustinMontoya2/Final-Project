'use client'

import { ILogin } from '@/interfaces/productoInterface';
<<<<<<< HEAD
=======
import { formLogin } from '@/lib/server/auth';
>>>>>>> 5aafe71698d23b71caba73ca1a13671d113793a4
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Login = () => {
<<<<<<< HEAD
=======
    const router = useRouter();

>>>>>>> 5aafe71698d23b71caba73ca1a13671d113793a4
    const initialState = {
        email: "",
        password: "",
    };
    
    const [userData, setUserData] = useState<ILogin>(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
<<<<<<< HEAD
        setUserData({ ...userData, [name]: value });
    };

=======
        setUserData({
            ...userData, 
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await formLogin(userData);
            localStorage.setItem("userSession", JSON.stringify({response}));
            

            Swal.fire({
                title: 'You have successfully logged in!',
                icon: 'success',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"

            });
            router.push("/menu");

        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Invalid credentials',
                icon: 'error',
                confirmButtonColor: "#ff2323"
            });
        }
    };


>>>>>>> 5aafe71698d23b71caba73ca1a13671d113793a4
    const renderInput = (type: string, name: keyof ILogin, label: string) => {
        return (
            <div className="w-4/5 mb-6 relative">
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={userData[name]}
                    onChange={handleChange}
                    className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                    required
                />
                <label
                    htmlFor={name}
                    className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                        userData[name] ? 'top-[4px] text-xs' : ''
                    }`}
                >
                    {label}
                </label>
            </div>
        );
    };

    return (
        <div className="absolute inset-0 w-full h-auto flex flex-col items-center justify-center bg-primary m-auto lg:w-2/3 2xl:w-1/2 2xl:relative 2xl:h-screen">
<<<<<<< HEAD
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center">
                <h2 className='w-full text-xl text-center text-neutral-800 font-extrabold'>JOIN CLUB FELLINI</h2>
=======
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <h2 className='w-full text-xl text-center text-neutral-800 font-extrabold'>LOGIN IN FELLINI BAR</h2>
>>>>>>> 5aafe71698d23b71caba73ca1a13671d113793a4
                {renderInput("email", "email", "Email")}
                {renderInput("password", "password", "Password")}
                <button
                    type="submit"
                    className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Login
                </button>
                <Link href="/register" className='text-neutral-800 mt-2 hover:underline'>Don't have an account? Register</Link>
            </form>
            <div className='w-full h-20'></div>
        </div>
    );
}

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 5aafe71698d23b71caba73ca1a13671d113793a4
