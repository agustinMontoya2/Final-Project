'use client'

import Link from 'next/link';
import React, { useState } from 'react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className="absolute inset-0 w-full flex flex-col items-center justify-center m-auto min-h-screen bg-primary lg:w-2/3 2xl:w-1/2 2xl:relative 2xl:h-screen">
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center">
                <h2 className='w-full text-xl text-center text-neutral-800 font-extrabold'>JOIN THE FELLINI CLUB</h2>
                <div className="w-4/5 mb-6 relative">
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="name"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                            name ? 'top-[4px] text-xs ' : ''
                        }`}
                    >
                        Name
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="email"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                            email ? 'top-[4px] text-xs ' : ''
                        }`}
                    >
                        Email
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <input
                        type="number"
                        id="telephone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="telephone"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                            telephone ? 'top-[4px] text-xs ' : ''
                        }`}
                    >
                        Phone
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="address"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                            address ? 'top-[4px] text-xs ' : ''
                        }`}
                    >
                        Address
                    </label>
                </div><div className="w-4/5 mb-6 relative">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="password"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                            password ? 'top-[4px] text-xs ' : ''
                        }`}
                    >
                        Password
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <input
                        type="password"
                        id="confirmpassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="confirmpassword"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                            confirmPassword ? 'top-[4px] text-xs ' : ''
                        }`}
                    >
                        Confirm password
                    </label>
                </div>
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

export default Register