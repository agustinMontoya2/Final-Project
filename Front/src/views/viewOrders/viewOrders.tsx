'use client'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { IGetOrder} from '@/interfaces/productoInterface';
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

    const handleGetOrders =  async ()=>{

        if (token && userId) {
        try {
            const ordersData = await getAllOrders(token);
            console.log(ordersData);
            
            if (ordersData) {
                setOrders(ordersData); 
            } else {
            console.warn("No reviews found.");
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
        }
    };

    return (
        <div className='w-4/5 m-auto mt-5'>
            {orders.length > 0 ? (
                <div>
                    <h2 className="text-3xl font-bold text-center text-black-900 mb-6">Orders</h2>
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
                                    <td className="p-3 border-b text-blue-600 font-semibold">{order.state}</td>
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