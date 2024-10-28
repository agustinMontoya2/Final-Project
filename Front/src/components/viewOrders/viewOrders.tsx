'use client'
import { getReviews, removeReviews } from '@/lib/server/reviews';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { IGetOrder, IOrder, IReview } from '@/interfaces/productoInterface';
import { getAllOrders } from '@/lib/server/order';
const ViewOrders = () => {
    const [orders, setOrders] = useState<IGetOrder[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);

useEffect(() => {
    const storedUserData = window.localStorage.getItem("userSession");
    if (storedUserData) {
    const parsedData = JSON.parse(storedUserData);
    if (parsedData && parsedData.user) {
        setUserId(parsedData.user.user_id);
        setToken(parsedData.token);
    }
    }
}, [userData]);

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

    // }
    // export interface IGetOrder {
    //     order_id: string;
    //     date: string;
    //     state: string;
    //     orderDetail: IOrderDetail;
    //   }
      
    //   export interface IOrderDetail {
    //     order_detail_id: string;
    //     order_type: string;
    //     payment_method: string;
    //     total: string;
    //     note: string;
    //     productDetails: IProductsDetails[];
    //   }

    // export interface IProductsDetails {
    //     product_detail_id: string;
    //     quantity: string;
    //     subtotal: string;
    //     product: IProducts;
    //   }


    return (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-lg">
            {orders.length > 0 ? (
                <div>
                    <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Orders</h2>
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