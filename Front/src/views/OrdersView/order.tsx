import { useEffect, useState } from 'react';
import { getOrders } from '@/Helpers/order';
import { IGetOrder } from '@/interfaces/productoInterface';
import Swal from 'sweetalert2';

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
            Swal.fire({
                title: `Log in to view the orders.`,
                icon: 'info',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
        }
    };

    useEffect(() => {
        if (userId && token) {
            handleGetOrders();
        }
    }, [userId, token]);

    return (
        <div className="min-h-screen flex flex-col items-center my-5">
            <h1 className="text-2xl font-bold text-black text-center mb-4">Orders</h1>
            <div className="w-full max-w-lg bg-white shadow-md p-6">
                <ul className='space-y-4 flex flex-col-reverse'>
                    {orders?.map((order) => (
                        <li key={order.order_id} className="mb-4 border p-3 rounded-lg bg-gray-50 shadow-sm">
                            <div className="mb-2">
                                <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                                <p
                                    className={`
                                        text-sm font-semibold
                                        ${order.state === 'approved' ? 'text-green-500' : ''}
                                        ${order.state === 'pending' ? 'text-orange-500' : ''}
                                        ${order.state !== 'approved' && order.state !== 'pending' ? 'text-gray-500' : ''}
                                    `}
                                >
                                Status: {order.state}
                                </p>
                            </div>
                            <div className="text-sm text-gray-500">
                                <p><strong>Order Type:</strong> {order.orderDetail.order_type}</p>
                                <p><strong>Payment Method:</strong> {order.orderDetail.payment_method}</p>
                                <p><strong>Total:</strong> ${order.orderDetail.total}</p>
                                {order.orderDetail.discount && (
                                    <p><strong>Discount Applied:</strong> ${order.orderDetail.discount}</p>
                                )}
                                {order.orderDetail.note && (
                                    <p><strong>Note:</strong> {order.orderDetail.note}</p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrdersView;
