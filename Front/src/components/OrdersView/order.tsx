'use client';
import { useEffect, useState } from 'react';
import { getOrders } from '@/lib/server/order';
import { IUserSession, IGetOrder } from '@/interfaces/productoInterface';

const OrdersView = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [orders, setOrders] = useState<IGetOrder[] | null>(null);

    useEffect(() => {
        const storedUserData = window.localStorage.getItem('userSession');
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            if (parsedData && parsedData.user) {
                setUserId(parsedData.user.user_id);
                setToken(parsedData.token);
            }
        }
    }, []);

    const handleGetOrders = async () => {
        if (userId && token) {
            try {
                const orders = await getOrders(userId, token);
                setOrders(orders);
            } catch (error) {
                console.error('Error obteniendo órdenes:', error);
            }
        } else {
            alert('Log in to view the orders.');
        }
    };

    useEffect(() => {
        if (userId && token) {
            handleGetOrders();
        }
    }, [userId, token]);

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center">
            <div className="w-full max-w-lg bg-white shadow-md p-6">
                <h1 className="text-2xl font-bold text-black text-center mb-4">Orders</h1>
                <ul>
                    {orders?.map((order) => (
                        <li key={order.order_id} className="mb-4 border p-3 rounded-lg bg-gray-50 shadow-sm">
                            <div className="mb-2">
                                <span className="block bg-red-100 text-red-600 font-semibold py-1 px-3 rounded-full text-sm">
                                    Order #{order.order_id}
                                </span>
                                <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-500">Status: {order.state}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                                <p><strong>Order Type:</strong> {order.orderDetail.order_type}</p>
                                <p><strong>Payment Method:</strong> {order.orderDetail.payment_method}</p>
                                <p><strong>Total:</strong> ${order.orderDetail.total}</p>
                                {order.orderDetail.note && (
                                    <p><strong>Note:</strong> {order.orderDetail.note}</p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
                {
                    orders  && <p className='text-black text-center'>No orders found.</p>
                }
            </div>
        </div>
    );
};

export default OrdersView;