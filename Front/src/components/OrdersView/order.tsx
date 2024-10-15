'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pedido } from '@/interfaces/productoInterface'



const OrdersView = () => {
const [pedidos, setPedidos] = useState<Pedido[]>([]);
const router = useRouter();

useEffect(() => {
    const fetchPedidos = async () => {
    const response = await fetch('/api/pedidos');
    const data = await response.json();
    setPedidos(data);
    };

    fetchPedidos();

}, []);

const verDetallePedido = (id: string) => {
    router.push(`/orders/${id}`);
};

return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center">
        <div className="w-full max-w-lg bg-white shadow-md p-6">
            <h1 className="text-2xl font-bold text-center mb-4 ">Orders</h1>
            <ul>{pedidos.map((pedido) => (
                <li key={pedido.id} className="flex justify-between items-center mb-4 border p-3 rounded-lg bg-gray-50 shadow-sm">
                    <span className="bg-red-100 text-red-600 font-semibold py-1 px-3 rounded-full text-sm">
                    Order #{pedido.numero}
                    </span>
                    <button onClick={() => verDetallePedido(pedido.id)} className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 transition-colors">View detail</button>
                </li>
                ))}
            </ul>
        </div>
    </div>

);
};

export default OrdersView;
