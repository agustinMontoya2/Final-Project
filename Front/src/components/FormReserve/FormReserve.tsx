'use client'

import React, { useState } from 'react';
import { addDays, format } from 'date-fns';

const ReservationForm: React.FC = () => {
    const [ubi, setUbi] = useState('');
    const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const [mealType, setMealType] = useState('');
    const [time, setTime] = useState('');
    const [peopleCount, setPeopleCount] = useState(0);
    const [setUser, setUserData] = useState<IUser[] | null >([])

    const mealTimes: { [key: string]: string[] } = {
        Desayuno: ['07:00', '07:30', '08:00'],
        Almuerzo: ['11:00', '11:30', '12:00', '12:30', '13:00'],
        Merienda: ['16:00', '16:30', '17:00', '17:30', '18:00'],
        Cena: ['20:00', '20:30', '21:00'],
    };

    const handleMealChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMealType(e.target.value);
        setTime('');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ ubi, date, mealType, time, peopleCount }); //falta agregar Ubicación (Exterior, Interior, Terraza)
        // manejar la lógica de reserva
    };

    return (
        <div className='absolute inset-0 w-full flex items-center justify-center lg:relative lg:h-screen lg:w-1/2 m-auto '>
            <form onSubmit={handleSubmit} className="w-full bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center">
                <h2 className='w-full text-xl text-center text-neutral-800 font-extrabold'>Reserve</h2>
                <div  className="w-4/5 mb-6 relative">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        max={format(addDays(new Date(), 15), 'yyyy-MM-dd')}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                </div>
                <div  className="w-4/5 mb-6 relative">
                    <select
                        value={mealType}
                        onChange={handleMealChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    >
                        <option value="" disabled>Selecciona un tipo de comida</option>
                        <option value="Desayuno">Desayuno</option>
                        <option value="Almuerzo">Almuerzo</option>
                        <option value="Merienda">Merienda</option>
                        <option value="Cena">Cena</option>
                    </select>
                    {mealType && (
                        <div  className="w-full mt-6 relative">
                            <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                            required
                            >
                            <option value="" disabled>Selecciona un horario</option>
                            {mealTimes[mealType].map((timeOption) => (
                                <option key={timeOption} value={timeOption}>{timeOption}</option>
                            ))}
                            </select>
                        </div>
                    )}
                </div>
                <div  className="w-4/5 mb-6 relative">
                    <select
                        value={ubi}
                        onChange={(e) => setUbi(e.target.value)}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    >
                        <option value="" disabled>Selecciona una ubicación</option>
                        <option value="Exterior">Exterior</option>
                        <option value="Interior">Interior</option>
                        <option value="Piso Superior">Rooftop</option>
                    </select>
                </div>
                <div  className="w-4/5 mb-6 relative">
                    <input
                        type="number"
                        placeholder='Cantidad de personas'
                        min="1"
                        max="15"
                        value={peopleCount}
                        onChange={(e) => setPeopleCount(Number(e.target.value))}
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
