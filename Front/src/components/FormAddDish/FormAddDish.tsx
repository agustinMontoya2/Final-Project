'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { FormValues } from '@/interfaces/productoInterface';
import React from 'react';

const FormularioMenu = () => {
const [formValues, setFormValues] = useState<FormValues>({
    nombre: '',
    descripcion: '',
    precio: '',
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
    formData.append('nombre', formValues.nombre);
    formData.append('descripcion', formValues.descripcion);
    formData.append('precio', formValues.precio);
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
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Add dish</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <input
            type="text"
            name="nombre"
            placeholder="Name"
            value={formValues.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
            />
        </div>
        <div className="mb-4">
            <textarea
            name="descripcion"
            placeholder="Description"
            value={formValues.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
            />
        </div>
        <div className="mb-4">
            <input
            type="number"
            name="precio"
            placeholder="Price"
            value={formValues.precio}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
            />
        </div>
        <div className="mb-4">
            <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
            />
        </div>
        <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
            Add dish
        </button>
        </form>
    </div>
    </div>
);
};

export default FormularioMenu;
