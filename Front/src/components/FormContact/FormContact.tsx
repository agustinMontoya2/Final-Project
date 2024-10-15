'use client'
import React, { useState } from 'react'

function FormContact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await fetch("api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, msg }),
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data);

            setName('');
            setEmail('');
            setMsg('');
        } else {
            console.error("Error al enviar el formulario");
        }
    };

    return (
        <div className='absolute inset-0 flex items-center justify-center 2xl:relative 2xl:h-screen 2xl:w-1/2 m-auto '>
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                    <h2 className='w-full text-xl text-center text-neutral-800 font-extrabold'>Contact us</h2>
                    <input type="text" hidden value={"Contacto"} id='contact'/>
                    <div className="w-4/5 mb-6 relative">
                        <input
                            type="text"
                            name='Nombre'
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
                            name='Email'
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
                        <textarea
                            name='Mensaje'
                            id="msg"
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full max-h-56 min-h-12 pt-4 pb-1"
                            required>
                        </textarea>
                        <label
                            htmlFor="email"
                            className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                                email ? 'top-[4px] text-xs ' : ''
                            }`}
                        >
                            Message
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200"
                    >
                        Send
                    </button>
            </form>
        </div>
    )
}

export default FormContact
