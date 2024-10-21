'use client';
import { useEffect, useState } from 'react';
import { addCart, getCart, removeQuantityCart, removeProductCart } from '@/lib/server/cart';
import Image from 'next/image';
import { ICart } from '@/interfaces/productoInterface';

const CartView = () => {
    const [cartItems, setCartItems] = useState<ICart | null>();
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [cart, setCart] = useState<string[]>([]);

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

    const handleGetCart = async () => {
        if (userId && token) {
            try {
                const items = await getCart(userId, token);
                setCartItems(items); 
            
            } catch (error) {
            alert(error);
            } 
        } else {
            alert("Inicia sesión para ver el carrito. o lo que quieras"); 
        }
    };

    const handleDeleteQuantityCart = async (product_detail_id: string) => {
    if (userId && token) {
        try {
            const response = await removeQuantityCart(product_detail_id, token);
            if (response) {

                await handleGetCart();
            } else {
                alert("Error al eliminar el producto del carrito");
            }
        } catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : error}`);
        }
    }
};

    const handleDeleteProductCart = async (product_detail_id: string) => {
    if (userId && token) {
        try {
            const response = await removeProductCart(product_detail_id, token);
            if (response) {

                await handleGetCart();
            } else {
                alert("Error al eliminar el producto del carrito");
            }
        } catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : error}`);
        }
    }
};

const handleAddCart = async (productId: string,) => {
    if (token && userId) {
        try {
            
                await addCart(userId, productId, token);
                setCart((prevCart) => [...prevCart, productId]);
                await handleGetCart();
        } catch (error) {
            alert (`Error: ${error instanceof Error ? error.message : error}`);
            console.error("Error al agregar al carrito", error.message);
        }
    } else {
        alert("Inicia sesión para agregar al carrito.");
    }
};

    useEffect(() => {
    if (userId && token) {
        handleGetCart();
    }
}, [userId, token]);


    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
    <h1 className="text-3xl font-bold text-black mb-6">Cart</h1>
    {cartItems?.productDetail.length === 0 ? (
        <p className="text-lg text-gray-700">Your cart is empty.</p>
    ) : (
        <ul className="bg-white shadow-lg rounded-lg w-[80%] max-w-4xl">
            {cartItems?.productDetail.map((item) => (
                <li key={item.product_detail_id} className="flex items-center justify-between p-6 border-b border-gray-300">
                    <div className="flex items-center">
                        <Image
                            src={item.product.image_url}
                            alt={item.product.product_name}
                            width={80}
                            height={80}
                            className="mr-6 rounded-lg object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-black">{item.product.product_name}</h2>
                            <p className="text-gray-600">Price: <span className="font-bold">${parseFloat(item.subtotal).toFixed(2)}</span></p>
                            <p className="text-gray-600">Quantity: <span className="font-bold">{item.quantity}</span></p>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleDeleteQuantityCart(item.product_detail_id)} 
                        className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        -
                    </button>
                    <button
                        className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                        onClick={() => {
                            handleAddCart(item.product.product_id);
                        }}
                    >
                        +
                    </button>
                    <button 
                        onClick={() => handleDeleteProductCart(item.product_detail_id)} 
                        className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                       Remove
                    </button>
                    
                </li>
            ))}
        </ul>
    )}
</div>
    );
};

export default CartView;