'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { IGetOrder } from '@/interfaces/productoInterface';
import { getAllOrders } from '@/Helpers/order';

const ViewOrders = () => {
    const [orders, setOrders] = useState<IGetOrder[]>([]);
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
            handleGetOrders();
        }
    }, [token, userId]);

    const handleGetOrders = async () => {
        if (token && userId) {
            try {
                const ordersData = await getAllOrders(token);
                console.log(ordersData);

                if (ordersData) {
                    setOrders(ordersData);
                } else {
                    console.warn("No orders found.");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
    };

    // Function to determine the color based on order state
    const getStateColor = (state: string) => {
        switch (state) {
            case 'pending':
                return 'text-orange-500'; // Orange color for pending
            case 'approved':
                return 'text-green-500'; // Green color for approved
            default:
                return 'text-gray-700'; // Default color for other states
        }
    };

    return (
        <div className='md:w-4/5 md:m-auto mt-10 md:mt-5'>
            {orders.length > 0 ? (
                <div className='w-full md:w-full'>
                    <h2 className="text-3xl font-bold text-center text-black-900 mb-6 text-neutral-800">Orders</h2>
                    <table className="w-full text-left border border-gray-300 bg-white shadow-md rounded-lg">
                        <thead className="bg-indigo-100">
                            <tr>
                                <th className="p-3 border-b font-semibold text-gray-700">Order Date</th>
                                <th className="p-3 border-b font-semibold text-gray-700">State</th>
                                <th className="p-3 border-b font-semibold text-gray-700">Order Type</th>
                                <th className="p-3 border-b font-semibold text-gray-700">Payment Method</th>
                                <th className="p-3 border-b font-semibold text-gray-700">Total</th>
                                <th className="p-3 border-b font-semibold text-gray-700">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.order_id} className="hover:bg-indigo-50 transition-colors">
                                    <td className="p-3 border-b text-gray-800">
                                        {new Date(order.date).toLocaleString('sv-SE', { hour12: false }).slice(0, 16)}
                                    </td>
                                    <td className={`p-3 border-b font-semibold ${getStateColor(order.state)}`}>
                                        {order.state}
                                    </td>
                                    <td className="p-3 border-b text-gray-800">{order.orderDetail.order_type}</td>
                                    <td className="p-3 border-b text-gray-800">{order.orderDetail.payment_method}</td>
                                    <td className="p-3 border-b text-gray-800 font-semibold">${order.orderDetail.total}</td>
                                    <td className="p-3 border-b text-gray-800">{order.orderDetail.note || "No note"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className='text-lg text-center text-gray-700'>No orders found.</p>
            )}
        </div>
    );
}

export default ViewOrders;
