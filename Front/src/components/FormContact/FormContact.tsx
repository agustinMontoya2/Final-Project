'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function FormContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        msg: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await fetch("api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            await res.json();
            setFormData({ name: '', email: '', msg: '' });
            Swal.fire({
                title: "Sent",
                text: "Thank you for contacting Club Fellini",
                icon: "success",
                confirmButtonText: "accept",
                confirmButtonColor: "#1988f0"
            })
        } else {
            console.error("Error al enviar el formulario");
        }
    };

    const renderInput = (type: string, name: keyof typeof formData, placeholder: string) => (
        <div className="w-4/5 mb-6 relative">
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    id={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full max-h-56 min-h-12 pt-4 pb-1"
                    required
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                    required
                />
            )}
            <label
                htmlFor={name}
                className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${formData[name] ? 'top-[4px] text-xs' : ''}`}
            >
                {placeholder}
            </label>
        </div>
    );

    return (
        <div className='absolute inset-0 flex items-center justify-center lg:relative lg:h-screen lg:w-1/2 m-auto'>
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <h2 className='w-full text-xl text-center text-neutral-800 font-extrabold'>Contact us</h2>
                <input type="text" hidden value="Contacto" id='contact' />
                {renderInput('text', 'name', 'Name')}
                {renderInput('email', 'email', 'Email')}
                {renderInput('textarea', 'msg', 'Message')}
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

export default FormContact;
