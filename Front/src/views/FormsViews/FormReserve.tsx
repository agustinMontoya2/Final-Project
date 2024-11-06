"use client"
import React, { useState, useEffect } from 'react';
import { IReserve, IUserSession } from '@/interfaces/productoInterface';
import { formReserve } from '@/Helpers/reservation';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const ReservationForm: React.FC = () => {
    const router = useRouter()

    const initialState: IReserve = {
        user_id: "",
        reservation_id: "",
        ubication: '',
        table: [],
        status: " ",
        date: new Date().toISOString().split('T')[0],
        time: '',
        peopleCount: 1,
    };

    const [userData, setUserData] = useState<IReserve>(initialState);
    const [user_id, setUser_id] = useState<string | null>(null);
    const [mealType, setMealType] = useState<string>('');

    const mealTimes: Record<string, string[]> = {
        Breakfast: ['07:00', '07:30', '08:00', '08:30'],
        Lunch: ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30'],
        Snack: ['16:00', '16:30', '17:00', '17:30'],
        Dinner: ['20:00', '20:30', '21:00', '21:30'],
    };

    useEffect(() => {
        if(typeof window !== "undefined"){

            const storedUserData = window.localStorage.getItem("userSession");
            if (storedUserData) {
                const parsedData = JSON.parse(storedUserData);
                if (parsedData && parsedData.user) {
                    setUser_id(parsedData.user.user_id);
                }
            }
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'mealType') {
            setMealType(value)
            setUserData(prevData => ({
                ...prevData,
                time: ''
            }))
        } else {
            setUserData(prevData => ({
                ...prevData,
                [name]: name === 'peopleCount' ? Number(value) : value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user_id) {
            Swal.fire({
                title: 'You must log in to make a reservation.',
                icon: 'info',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
            return;
        }

        const reservationData: IReserve = {
            user_id,
            table: userData.table,
            reservation_id: userData.reservation_id,
            status: userData.status,
            ubication: userData.ubication,
            date: userData.date,
            time: userData.time,
            peopleCount: userData.peopleCount,
        };

        try {
            await formReserve({ ...reservationData });
            Swal.fire({
                icon: 'success',
                title: 'Reservation created',
                toast: true,
                position: 'top-end',
                timer: 2500,
                showConfirmButton: false,
                timerProgressBar: true,
            });
            router.push("/reservations")
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'No tables available',
                toast: true,
                position: 'top-end',
                timer: 2500,
                showConfirmButton: false,
                timerProgressBar: true,
            });
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center lg:relative lg:h-screen lg:w-1/2 m-auto">
            <form onSubmit={handleSubmit} className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center">
                <h2 className="w-full text-xl text-center text-neutral-800 font-extrabold">Reservation</h2>

                <div className="w-4/5 mb-6 relative">
                    <input
                        type="date"
                        name="date"
                        value={userData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="date"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${userData.date ? 'top-[5px] text-xs' : ''}`}
                    >
                        Date
                    </label>
                </div>

                <div className="w-4/5 mb-6 relative">
                    <select
                        name="mealType"
                        value={mealType}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    >
                        <option className={'text-black'} value="" disabled></option>
                        {Object.keys(mealTimes).map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <label
                        htmlFor="mealType"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${mealType ? 'top-[5px] text-xs' : ''}`}
                    >
                        Meal Type
                    </label>
                </div>

                {mealType && (
                    <div className="w-4/5 mb-6 relative">
                        <select
                            name="time"
                            value={userData.time}
                            onChange={handleChange}
                            className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                            required
                        >
                            <option className={'text-black'} value="" disabled></option>
                            {mealTimes[mealType].map((timeOption) => (
                                <option key={timeOption} value={timeOption}>{timeOption}</option>
                            ))}
                        </select>
                        <label
                            htmlFor="time"
                            className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${userData.time ? 'top-[5px] text-xs' : ''}`}
                        >
                            Time
                        </label>
                    </div>
                )}

                <div className="w-4/5 mb-6 relative">
                    <select
                        name="ubication"
                        value={userData.ubication}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    >
                        <option className={'text-black'} value="" disabled></option>
                        <option value="Exterior" >Exterior</option>
                        <option value="Interior" >Interior</option>
                        <option value="Rooftop" >Rooftop</option>
                    </select>
                    <label
                        htmlFor="ubication"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${userData.ubication ? 'top-[5px] text-xs' : 'top-4 text-base'}`}
                    >
                        Ubication
                    </label>
                </div>


                <div className="w-4/5 mb-6 relative">
                    <input
                        type="number"
                        name="peopleCount"
                        min="1"
                        max="15"
                        value={userData.peopleCount}
                        onChange={handleChange}
                        placeholder="Cantidad de personas"
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="peopleCount"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${userData.peopleCount ? 'top-[5px] text-xs' : ''}`}
                    >
                        How many people
                    </label>
                </div>

                <button type="submit" className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200">
                    Reserve
                </button>
            </form>
        </div>
    );
};

export default ReservationForm;
