'use client'

import React, { useState } from "react"
import InputPDF from "../InputPDF/InputPDF";
const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [position, setPosition] = useState('');

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen bg-primary ">
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center">
                <h2 className='w-full text-xl text-center text-neutral-800 font-extrabold'>JOIN OUR TEAM</h2>
                <p className="text-neutral-800 font-bold text-center">
                    Fill out the following form and we will contact you.
                </p>
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
                        Telephone
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
                </div>
                <div className="w-4/5 mb-6 relative">
                    <input
                        type="text"
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="position"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                            position ? 'top-[4px] text-xs ' : ''
                        }`}
                    >
                        Post of interest
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <input
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="date"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                            date ? 'top-[4px] text-xs ' : ''
                        }`}
                    >
                        Application date
                    </label>
                </div>
                <InputPDF />
                <button
                    type="submit"
                    className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
export default Contact