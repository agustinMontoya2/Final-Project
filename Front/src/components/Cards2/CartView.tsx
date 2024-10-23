'use client';
import { useEffect, useState } from 'react';
import { addCart, getCart, removeQuantityCart, removeProductCart } from '@/lib/server/cart';
import { postOrder } from '@/lib/server/order';
import Image from 'next/image';
import { ICart, IOrder } from '@/interfaces/productoInterface';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const CartView = () => {
    const [cartItems, setCartItems] = useState<ICart>({ productDetail: [] });
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [totalCart, setTotalCart] = useState<number>(0);
    const [note, setNote] = useState<string>("");
    const [deliveryOption, setDeliveryOption] = useState<string>("dine-in"); 
    const [paymentOption, setPaymentOption] = useState<string>("cash"); 
    const router = useRouter();

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
                calculateTotal(items);
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
                alert("Error al obtener el carrito.");
            }
        } else {
            alert("Log in to view the cart.");
        }
    };

    const calculateTotal = (items: ICart) => {
        if (items && items.productDetail) {
            const total = items.productDetail.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);
            setTotalCart(total);
        } else {
            setTotalCart(0);
        }
    };

    const handleDeleteQuantityCart = async (product_detail_id: string) => {
        if (userId && token) {
            try {
                const response = await removeQuantityCart(product_detail_id, token);
                if (response) {
                    await handleGetCart();
                } else {
                    alert("Failed to delete the product from the cart.");
                }
            } catch (error) {
                console.error(`Error: ${error instanceof Error ? error.message : error}`);
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
                    alert("Failed to delete the product from the cart.");
                }
            } catch (error) {
                console.error(`Error: ${error instanceof Error ? error.message : error}`);
                alert(`Error: ${error instanceof Error ? error.message : error}`);
            }
        }
    };

    const handleAddCart = async (productId: string) => {
        if (token && userId) {
            try {
                await addCart(userId, productId, token);
                await handleGetCart();
            } catch (error) {
                alert(`Error: ${error instanceof Error ? error.message : error}`);
                console.error("Error to add product to cart");
            }
        } else {
            alert("Log in to add product to the cart.");
        }
    };

    const handlePostOrder = async (orderData: IOrder) => {
        if (!cartItems.productDetail.length) {
            Swal.fire({
                icon: 'error',
                title: 'Your cart is empty. Add products before finalizing the order.',
                toast: true,
                position: 'top-end',
                timer: 2500,
                showConfirmButton: false,
                timerProgressBar: true,
            });
            return;
        } 
        
        if (!userId) {
            alert("User ID is missing. Please log in.");
            return;
        }

        if (token && deliveryOption && paymentOption) {
            const orderData: IOrder = {
                userId,
                order_type: deliveryOption,
                payment_method: paymentOption,
                note,
            };

            try {
                const response = await postOrder(orderData, token);
                if (response) {
                    await handleGetCart();
                    Swal.fire({
                        icon: 'success',
                        title: 'Order created',
                        toast: true,
                        position: 'top-end',
                        timer: 2500,
                        showConfirmButton: false,
                        timerProgressBar: true,
                    });

                    setNote("");
                } else {
                    alert("Failed to create the order.");
                }
            } catch (error) {
                alert(`Error: ${error instanceof Error ? error.message : error}`);
            }
        }
    };

    useEffect(() => {
        if (userId && token) {
            handleGetCart();
        }
    }, [userId, token]);

    const handleFinishOrder = () => {
        router.push('/menu'); 
    };

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
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleDeleteQuantityCart(item.product_detail_id)}
                                    className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    -
                                </button>
                                <button
                                    className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                    onClick={() => handleAddCart(item.product.product_id)}
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleDeleteProductCart(item.product_detail_id)}
                                    className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                    <span className="flex justify-between p-6">
                        <p className="text-lg font-semibold text-black">Total:</p>
                        <p className="bg-secondary rounded-lg p-2 text-lg font-bold text-white">${totalCart.toFixed(2)}</p>
                    </span>
                </ul>
            )}

            <div className="mt-4 w-[80%] max-w-4xl">
                <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add any special requests or notes here..."
                    className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mt-4 w-[80%] max-w-4xl">
                <label className="block text-lg font-semibold text-black mb-2">Choose Option:</label>
                <select
                    value={deliveryOption}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="dine-in">Home delivery</option>
                    <option value="takeout">delivery</option>
                </select>
            </div>
            <div className="mt-4 w-[80%] max-w-4xl">
                <label className="block text-lg font-semibold text-black mb-2">Choose Payment Method Option:</label>
                <select
                    value={paymentOption}
                    onChange={(e) => setPaymentOption(e.target.value)}
                    className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="cash">Cash</option>
                    <option value="Card">Card</option>
                </select>
            </div>

            <button
                onClick={()=> handlePostOrder({ userId,
                    order_type: deliveryOption,
                    payment_method: paymentOption,
                    note, })}
                className="mt-6 bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                disabled={!cartItems || cartItems.productDetail.length === 0}
            >
                Finalize Order
            </button>
        </div>
    );
};


export default CartView;
