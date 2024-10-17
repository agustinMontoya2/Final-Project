'use client'

import React, { useState } from 'react';

const InputPDF: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
        } else {
            alert("Por favor, selecciona un archivo PDF.");
            setFile(null);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            // Aquí puedes manejar la subida del archivo
            console.log("Archivo seleccionado:", file);
            // Implementa tu lógica para subir el archivo
        } else {
            alert("Por favor, selecciona un archivo PDF para enviar.");
        }
    };

    return (
        <div className='w-full'>
            <form className=" bg-neutral-300 p-6 rounded-lg flex flex-col items-center" onSubmit={handleSubmit}>
                <label className="w-full mb-6 relative">
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required
                    />
                    <span className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1">
                        {file ? file.name : "Select your CV in PDF format"}
                    </span>
                </label>
            </form>
        </div>
    );
}

export default InputPDF;
