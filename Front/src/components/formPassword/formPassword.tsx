'use client';

import { ILogin } from '@/interfaces/productoInterface';
import { formLogin, resetPassword } from '@/lib/server/auth';
import next from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const FormPassword = () => {
    const initialState = {
        newPassword: "",
        confirmPassword: "",
    };
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
       
            setUserData(prevData => ({
                ...prevData,
                [name]: value
            }))
            console.log(userData);
            
            
    };

    const ShowPasswordFunction = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(userData.newPassword === userData.confirmPassword){
        try {
            alert(userData.newPassword)
            resetPassword("sadsad",userData.newPassword)
        } catch (error) {
            alert(error.message);
        }
    }  else{
        alert("Passwords do not match");
    }
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="w-4/5 mb-6 relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={userData.newPassword}
                    onChange={handleChange}
                    className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                    required
                />
                <label
                    htmlFor="password"
                    className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${userData.newPassword ? 'top-[4px] text-xs' : ''}`}
                >
                    Password
                </label>
                <i
                    className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                    onClick={ShowPasswordFunction}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: 'black'
                    }}
                ></i>
            </div>

            <div className="w-4/5 mb-6 relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                    required
                />

                <label
                    htmlFor="confirmPassword"
                    className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${userData.confirmPassword ? 'top-[4px] text-xs' : ''}`}
                >
                    Confirm Password
                </label>
                <i
                    className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                    onClick={ShowPasswordFunction}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: 'black'
                    }}
                ></i>
            </div>

            <button type="submit" className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200">
                Reset Password
            </button>
        </form>
    );
};

export default FormPassword;
