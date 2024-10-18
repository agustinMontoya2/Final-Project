'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { FormValues } from '@/interfaces/productoInterface';
import React from 'react';

const FormularioMenu = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        descripcion: '',
        price: '',
        imagen: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormValues({
                ...formValues,
                imagen: e.target.files[0],
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', formValues.name);
        formData.append('descripcion', formValues.descripcion);
        formData.append('precio', formValues.price);
        if (formValues.imagen) {
            formData.append('imagen', formValues.imagen);
        }

        try {
            const response = await fetch('/api/menus', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Menú agregado correctamente!');
            } else {
                alert('Error al agregar el menú');
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Ocurrió un error al intentar agregar el menú');
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <h2 className="w-full text-xl text-center text-neutral-800 font-extrabold">Add dish</h2>
                <div className="w-4/5 mb-6 relative">
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="Name"
                        value={formValues.name}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="nombre"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                            formValues.price ? 'top-[4px] text-xs' : ''
                        }`}
                    >
                        Name
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <textarea
                        name="descripcion"
                        id="descripcion"
                        placeholder="Description"
                        value={formValues.descripcion}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="descripcion"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                            formValues.descripcion ? 'top-[4px] text-xs' : ''
                        }`}
                    >
                        Description
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <input
                        type="number"
                        name="precio"
                        id="precio"
                        placeholder="Price"
                        value={formValues.price}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="precio"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                            formValues.price ? 'top-[4px] text-xs' : ''
                        }`}
                    >
                        Price
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <label htmlFor="imagen" className="w-full flex flex-col items-center p-4 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                        <span className="text-gray-600">Click to upload an image</span>
                        {formValues.imagen ? (
                        <span className="mt-2 text-gray-700">{formValues.imagen.name}</span>
                        ) : (
                        <span className="mt-2 text-gray-500 text-sm">No file selected</span>
                        )}
                    </label>
                    <input id="imagen"type="file"onChange={handleFileChange}className="hidden"required/>
                </div>

                <button
                    type="submit"
                    className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Add dish
                </button>
            </form>
        </div>
    );
};

export default FormularioMenu;
