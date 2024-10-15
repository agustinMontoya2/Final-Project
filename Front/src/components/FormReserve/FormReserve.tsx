'use client';

import React, { useState } from 'react';
import { addDays, format } from 'date-fns';

const ReservationForm: React.FC = () => {
    const initialState = {
        ubi: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        mealType: '',
        time: '',
        peopleCount: 0,
    };

    const [formData, setFormData] = useState(initialState);

    const mealTimes: Record<string, string[]> = {
        Desayuno: ['07:00', '07:30', '08:00'],
        Almuerzo: ['11:00', '11:30', '12:00', '12:30', '13:00'],
        Merienda: ['16:00', '16:30', '17:00', '17:30', '18:00'],
        Cena: ['20:00', '20:30', '21:00'],
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === 'mealType' && { time: '' }), // Reset time if mealType changes
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        // manejar la lógica de reserva
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center lg:relative lg:h-screen lg:w-1/2 m-auto">
            <form onSubmit={handleSubmit} className="w-full bg-neutral-300 p-6 rounded-lg flex flex-col items-center">
                <h2 className="w-full text-xl text-center text-neutral-800 font-extrabold">Reserve</h2>

                <div className="w-4/5 mb-6 relative">
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        max={format(addDays(new Date(), 15), 'yyyy-MM-dd')}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                </div>

                <div className="w-4/5 mb-6 relative">
                    <select
                        name="mealType"
                        value={formData.mealType}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    >
                        <option value="" disabled>Selecciona un tipo de comida</option>
                        {Object.keys(mealTimes).map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    {formData.mealType && (
                        <div className="w-full mt-6 relative">
                            <select
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                                required
                            >
                                <option value="" disabled>Selecciona un horario</option>
                                {mealTimes[formData.mealType].map((timeOption) => (
                                    <option key={timeOption} value={timeOption}>{timeOption}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="w-4/5 mb-6 relative">
                    <select
                        name="ubi"
                        value={formData.ubi}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    >
                        <option value="" disabled>Selecciona una ubicación</option>
                        <option value="Exterior">Exterior</option>
                        <option value="Interior">Interior</option>
                        <option value="Piso Superior">Rooftop</option>
                    </select>
                </div>

                <div className="w-4/5 mb-6 relative">
                    <input
                        type="number"
                        name="peopleCount"
                        placeholder="Cantidad de personas"
                        min="1"
                        max="15"
                        value={formData.peopleCount}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-red-600 text-white py-2 px-4 rounded"
                >
                    Reserve
                </button>
            </form>
        </div>
    );
};

export default ReservationForm;
