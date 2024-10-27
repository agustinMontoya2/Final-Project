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
                    <ul className="space-y-6">
                        {orders.map((order) => (
                            <li key={order.order_id} className="p-5 border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                                <h2 className="text-xl font-semibold text-gray-800">Order Date: {order.date}</h2>
                                <p className="text-gray-600">State: <span className="font-semibold text-blue-600">{order.state}</span></p>
    
                                <div className="mt-3">
                                    <h3 className="text-lg font-semibold text-gray-800">Order Details:</h3>
                                    <p className="text-gray-600 mt-1">Order Type: <span className="font-semibold">{order.orderDetail.order_type}</span></p>
                                    <p className="text-gray-600">Payment Method: <span className="font-semibold">{order.orderDetail.payment_method}</span></p>
                                    <p className="text-gray-600">Total: <span className="font-semibold">${order.orderDetail.total}</span></p>
                                    <p className="text-gray-600">Note: <span className="font-semibold">{order.orderDetail.note}</span></p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className='text-lg text-center text-gray-700'>No orders found.</p>
            )}
        </div>
    );
}

export default ViewOrders;