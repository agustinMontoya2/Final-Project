'use client'

import Link from 'next/link';
import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="absolute inset-0 w-full h-auto flex flex-col items-center justify-center bg-primary m-auto lg:w-2/3 2xl:w-1/2 2xl:relative 2xl:h-screen">
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center">
                <h2 className='w-full text-xl text-center text-neutral-800 font-extrabold'>JOIN CLUB FELLINI</h2>
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
                            email ? 'top-[4px] text-xs text-red-600' : ''
                        }`}
                    >
                        Email
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
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
                            password ? 'top-[4px] text-xs text-red-600' : ''
                        }`}
                    >
                        Password
                    </label>
                </div>
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

export default Login