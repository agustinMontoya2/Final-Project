'use client';

import { IRegister } from '@/interfaces/productoInterface';
import { formRegister } from '@/lib/server/auth';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const Register = () => {

    const router = useRouter()

    const initialState: IRegister = {
        name: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        confirmPassword: "",
    };

    const [userData, setUserData] = useState<IRegister>(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await formRegister(userData);
            Swal.fire({
                title: 'You have successfully registered!',
                icon: 'success',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
            router.push("/login")
        } catch (error) {
            console.log(error);
            
        }
        router.push("/login")
    };
    

    const renderInput = (type: string, name: keyof IRegister, label: string) => (
        <div className="w-4/5 mb-6 relative">
            <input
                type={type}
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
        </div>
    );

  
    return (
        <div className="absolute inset-0 w-full flex flex-col items-center justify-center m-auto min-h-screen bg-primary lg:w-2/3 2xl:w-1/2 2xl:relative 2xl:h-screen">
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <h2 className='w-full text-xl text-center text-neutral-800 font-extrabold'>JOIN THE FELLINI CLUB</h2>
                {renderInput("text", "name", "Name")}
                {renderInput("email", "email", "Email")}
                {renderInput("text", "phone", "Phone")}
                {renderInput("text", "address", "Address")}
                {renderInput("password", "password", "Password")}
                {renderInput("password", "confirmPassword", "Confirm password")}

                <button
                    type="submit"
                    className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Check in
                </button>
                <Link href="/login" className='text-neutral-800 mt-2 hover:underline'>Do you already have an account? Login</Link>
            </form>
        </div>
    );
}

export default Register;
