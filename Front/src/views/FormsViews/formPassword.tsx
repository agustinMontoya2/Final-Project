'use client';
import { resetPassword } from '@/Helpers/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const FormPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const initialState = {
        token: "",
        newPassword: "",
        confirmPassword: "",
    };
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState(initialState);

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            setUserData(prevData => ({
                ...prevData,
                token
            }))
            console.log(token);
        }
    }, [searchParams, router]);
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
        if (userData.newPassword === userData.confirmPassword) {
            try {
                const response = await resetPassword(userData)
                Swal.fire({
                    title: 'Password changed',
                    icon: 'success',
                    timer: 1000,
                });
                router.push('/login')
            } catch {
                Swal.fire({
                    title: 'Error changing password',
                    icon: 'error',
                    timer: 1000,
                });

            }
        } else {
            Swal.fire({
                title: 'Passwords do not match',
                icon: 'error',
                timer: 1000,
            });
        }
    }
    return (
        <form onSubmit={handleSubmit} className="w-4/5 md:w-1/3 h-screen m-auto flex flex-col justify-center items-center">
            <div className="w-full mb-6 relative">
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

            <div className="w-full mb-6 relative">
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

            <button type="submit" className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200">
                Reset Password
            </button>
        </form>
    );
};

export default FormPassword;
