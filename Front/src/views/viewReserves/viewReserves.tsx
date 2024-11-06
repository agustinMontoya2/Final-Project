'use client'

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { IReserve } from '@/interfaces/productoInterface';
import { getAllReservations, removeReserve } from '@/Helpers/reservation';
import Swal from 'sweetalert2';
const ViewReserves = () => {
    const [reserves, setReserves] = useState<IReserve[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

useEffect(() => {
    const storedUserData = window.localStorage.getItem("userSession");
    if (storedUserData) {
    const parsedData = JSON.parse(storedUserData);
    if (parsedData && parsedData.user) {
        setUserId(parsedData.user.user_id);
        setToken(parsedData.token);
    }
    }
}, []);

useEffect(() => {
    if (token && userId) {
    handleGetReserves();
    }
}, [token, userId]);

    const handleGetReserves =  async ()=>{
        if (token && userId) {
        try {
            const reservesData = await getAllReservations(token);
            console.log(reservesData);
            
            if (reservesData) {
                setReserves(reservesData); 
            } else {
            console.warn("No reviews found.");
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
        }
    };

    const handleCancelReserve = async (reservation_id: string) => {
        if (token) {
            try {
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: "This action cannot be undone!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, cancel it!',
                    cancelButtonText: 'No, no cancel'
                });
    
                // Si el usuario confirma, proceder con la eliminación
                if (result.isConfirmed) {
                await removeReserve(reservation_id, token);
                Swal.fire({
                    title: 'Reservation cancelled',
                    icon: 'success',
                    timer: 1000,
                });
                handleGetReserves();}
                // setReserves((prevReserves) => prevReserves.filter((reserve) => reserve.reservation_id !== reservation_id));
            } catch (error) {
                console.error("Error canceling reservation:", error);
            }
        }
    };
    return (
        <div className=" ">
            {reserves.length > 0 ? (
                <div className='w-11/12 m-auto overflow-x-scroll overflow-hidden'>
                    <h2 className="text-3xl font-bold text-center text-black-700 mb-6 text-neutral-800">Reservations</h2>
                    <table className="w-full text-left border border-gray-300 bg-white shadow-md rounded-lg">
                        <thead className="bg-indigo-100">
                            <tr>
                                <th className="p-3 border-b font-semibold text-gray-700">Date</th>
                                <th className="p-3 border-b font-semibold text-gray-700">Time</th>
                                <th className="p-3 border-b font-semibold text-gray-700">Status</th>
                                <th className="p-3 border-b font-semibold text-gray-700">People Count</th>
                                <th className="p-3 border-b font-semibold text-gray-700">Table Details</th>
                                <th className="p-3 border-b font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reserves.map((reserve) => (
                                <tr key={reserve.reservation_id} className="hover:bg-indigo-50 transition-colors">
                                    <td className="p-3 border-b text-gray-800">{new Date(reserve.date).toLocaleDateString('sv-SE')}</td>
                                    <td className="p-3 border-b text-black-600 font-semibold text-neutral-700">{reserve.time}hs</td>
                                    <td className="p-3 border-b text-gray-800">
                                        <span className={`font-semibold ${reserve.status ? 'text-green-600' : 'text-red-600'}`}>
                                            {reserve.status ? "Active" : "Cancelled"}
                                        </span>
                                    </td>
                                    <td className="p-3 border-b text-gray-800">{reserve.peopleCount}</td>
                                    <td className="p-3 border-b text-gray-800">
                                        {reserve.table.length > 0 ? (
                                            reserve.table.map((table) => (
                                                <p key={table.table_id} className="mt-1">
                                                    Table: <span className="font-semibold">{table.table_number}</span>, Location: <span className="font-semibold">{table.ubication}</span>
                                                </p>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">No table assigned</span>
                                        )}
                                    </td>
                                    <td className="p-3 border-b">
                                        {reserve.status ? (
                                            <button
                                                onClick={() => handleCancelReserve(reserve.reservation_id)}
                                                className="px-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                                            >
                                                Cancel Reservation
                                            </button>
                                        ) : (
                                            <span className="text-gray-500">No action available</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className='text-lg text-center text-gray-700'>No reservations found.</p>
            )}
        </div>
    );
    
}

export default ViewReserves;