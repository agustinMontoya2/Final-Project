'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { Pedido } from '@/interfaces/productoInterface'
import Swal from 'sweetalert2';

const OrderDetail = () => {

const { id } = useParams();

const [pedido, setPedido] = useState<Pedido | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const fetchPedido = async () => {
    try {
        if (id) {
            const response = await fetch(`/api/pedidos/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el pedido');
        }
        const data = await response.json();
        setPedido(data);
        setLoading(false);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError("An unknown error occurred");
        }
        setLoading(false);
    }
};

    fetchPedido();
}, [id]);

const confirmarPedido = () => {
    Swal.fire({
        title: `Order #${pedido?.numero} confirmed!`,
        icon: 'success',
        confirmButtonText: 'accept',
        confirmButtonColor: "#1988f0"
    })
};
if (loading) {
    return <p>Loading order detail...</p>;
}
if (error) {
    return <p>Error : {error}</p>;
}
if (!pedido) {
    return <p>Order not found.</p>;
}

return (
    
    <div className="min-h-screen bg-gray-200 flex flex-col items-center">
    <div className="w-full max-w-lg bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Order Detail</h1>
        <div className="bg-red-600 text-white text-center p-2 rounded mb-4">
        <span className="font-bold">Order Nº: #{pedido.numero}</span>
        </div>

        <div className="space-y-4">
        {pedido.platos.map((plato, index) => (
            <div key={index} className="border border-gray-400 p-4 rounded">
            <p><strong>Dish:</strong> {plato.nombre}</p>
            <p><strong>Amount:</strong> {plato.cantidad}</p>
            <p><strong>Notes:</strong> {plato.aclaraciones}</p>
            </div>
        ))}
        </div>

        <button
        onClick={confirmarPedido}
        className="bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-green-700 w-full"
        >
        Confirm order
        </button>
    </div>
    </div>
    
);
};

export default OrderDetail;
