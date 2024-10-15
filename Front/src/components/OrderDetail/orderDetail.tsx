'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'; 
import { Pedido, Plato } from '@/interfaces/productoInterface'

const OrderDetail = () => {

const router = useRouter();
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
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
    };

    fetchPedido();
}, [id]);

const confirmarPedido = () => {
    alert(`Pedido #${pedido?.numero} confirmado!`);
};
if (loading) {
    return <p>Cargando detalles del pedido...</p>;
}
if (error) {
    return <p>Error: {error}</p>;
}
if (!pedido) {
    return <p>No se encontró el pedido.</p>;
}

return (
    
    <div className="min-h-screen bg-gray-200 flex flex-col items-center">
    <div className="w-full max-w-lg bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Detalle del pedido</h1>
        <div className="bg-red-600 text-white text-center p-2 rounded mb-4">
        <span className="font-bold">Nº de pedido: #{pedido.numero}</span>
        </div>

        <div className="space-y-4">
        {pedido.platos.map((plato, index) => (
            <div key={index} className="border border-gray-400 p-4 rounded">
            <p><strong>Plato:</strong> {plato.nombre}</p>
            <p><strong>Cantidad:</strong> {plato.cantidad}</p>
            <p><strong>Aclaraciones:</strong> {plato.aclaraciones}</p>
            </div>
        ))}
        </div>

        <button
        onClick={confirmarPedido}
        className="bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-green-700 w-full"
        >
        Confirmar Pedido
        </button>
    </div>
    </div>
    
);
};

export default OrderDetail;
