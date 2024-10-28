'use client';
import { useEffect, useState } from 'react';
import { addCart, getCart, removeQuantityCart, removeProductCart } from '@/lib/server/cart';
import { postOrder } from '@/lib/server/order';
import Image from 'next/image';
import { ICart, IOrder } from '@/interfaces/productoInterface';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { PagoMercado } from '@/Helpers/MercadoPago';

const CartView = () => {
    const [cartItems, setCartItems] = useState<ICart>({
        cart_id: '', // o un valor adecuado
        note: '',    // o un valor adecuado
        product: [], // inicializa con un array vacío si es una lista
        productDetail: [], // inicializa con un array vacío
    });
    
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
                Swal.fire({
                    title: 'Error getting cart.',
                    icon: 'error',
                    confirmButtonText: 'accept',
                    confirmButtonColor: "#1988f0"
                })
            }
        } else {
            Swal.fire({
                title: 'Log in to view the cart.',
                icon: 'info',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
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
                    Swal.fire({
                        title: 'Failed to delete the product from the cart.',
                        icon: 'error',
                        confirmButtonText: 'accept',
                        confirmButtonColor: "#1988f0"
                    })
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
                    Swal.fire({
                        title: 'Failed to delete the product from the cart.',
                        icon: 'error',
                        confirmButtonText: 'accept',
                        confirmButtonColor: "#1988f0"
                    })
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
            Swal.fire({
                title: 'Log in to add product to the cart.',
                icon: 'error',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
        }
    };

    const handlerMercadoPago = async () => {
        if (token && userId) {
            try {
                alert(userId)
                console.log (userId)
                const data = await PagoMercado(userId, token);
                console.log("Payment response:", data); 
                if (data && data.init_point) {
                    window.location.href = data.init_point; 
                    handlePostOrder()
                } else {
                    alert("Error al iniciar el pago con MercadoPago.");
                }
            } catch (error) {
                console.error("Error en la integración con MercadoPago:", error);
                alert("Error al procesar el pago con MercadoPago.");
            }
        }
    };
    
    
    
    const handlePostOrder = async () => {
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
            Swal.fire({
                title: 'User ID is missing. Please log in.',
                icon: 'error',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
            return;
        }

        if (token && deliveryOption && paymentOption) {
            const orderData: IOrder = {
                userId: userId,
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
                    if (paymentOption === 'Card') {
                        await handlerMercadoPago();
                    }
                } else {
                    Swal.fire({
                        title: 'failed to create the order.',
                        icon: 'error',
                        confirmButtonText: 'accept',
                        confirmButtonColor: "#1988f0"
                    })
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
        <div className="flex flex-col items-center justify-center min-h-screen py-8">
            <h1 className="text-3xl font-bold text-black mb-6">Cart</h1>
            {cartItems?.productDetail.length === 0 ? (
                    <p className="text-lg text-gray-700">Your cart is empty.</p>
            ) : (
                <div>
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
                        <div className="w-[80%] max-w-4xl mt-6">
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full h-24 max-h-56 min-h-16 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Any special instructions or notes?"
                            />
                            <h3 className="mt-6 font-semibold text-lg text-black">Delivery Options</h3>
                            <div className="flex mt-2">
                                <label className="flex items-center text-neutral-800">
                                    <input
                                        type="checkbox"
                                        value="dine-in"
                                        checked={deliveryOption === "dine-in"}
                                        onChange={(e) => setDeliveryOption(e.target.checked ? e.target.value : "")}
                                        className="mr-2"
                                    />
                                    Take Away
                                </label>
                                <label className="flex items-center text-neutral-800 ml-5">
                                    <input
                                        type="checkbox"
                                        value="delivery"
                                        checked={deliveryOption === "delivery"}
                                        onChange={(e) => setDeliveryOption(e.target.checked ? e.target.value : "")}
                                        className="mr-2"
                                    />
                                    Delivery
                                </label>
                            </div>
                            <h3 className="mt-6 font-semibold text-lg text-black">Payment Method</h3>
                            <div className="flex mt-2">
                                <label className="flex items-center text-neutral-800">
                                    <input
                                        type="checkbox"
                                        value="cash"
                                        checked={paymentOption === "cash"}
                                        onChange={(e) => setPaymentOption(e.target.checked ? e.target.value : "")}
                                        className="mr-2"
                                    />
                                    Cash
                                </label>
                                <label className="flex items-center text-neutral-800 ml-5">
                                    <input
                                        type="checkbox"
                                        value="card"
                                        checked={paymentOption === "card"}
                                        onChange={(e) => setPaymentOption(e.target.checked ? e.target.value : "")}
                                        className="mr-2"
                                    />
                                    Card
                                </label>
                            </div>
                            <div className="flex justify-center space-x-4 mt-6">
                                <button
                                    onClick={handleFinishOrder}
                                    className="bg-secondary text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                >
                                    Continue Shopping
                                </button>
                                {paymentOption === "card" && (
                                    <button
                                        onClick={handlerMercadoPago}
                                        className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        Pay with MercadoPago
                                    </button>
                                )}
                                <button
                                    onClick={handlePostOrder}
                                    className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                                >
                                    Finalize Order
                                </button>
                            </div>
                        </div>
                    </div>
            )}
        </div>
    );
}

export default CartView;


// const Producto = () => {
//     const [notification, setNotificacion] = useState({
//       isOpen: false,
//       type: null,
//       content: '',
//     });
  
//     useEffect(() => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const status = urlParams.get('status');
//       if (status === 'approved') {
//         setNotificacion({
//           content: 'Pago aprovado',
//           isOpen: true,
//           type: 'approved',
//         });
//       } else if (status === 'failure') {
//         setNotificacion({
//           content: 'Pago fallido',
//           isOpen: true,
//           type: 'failure',
//         });
//       }
//       setTimeout(() => {
//         setNotificacion({
//           isOpen: false,
//           type: null,
//           content: '',
//         });
//       }, 5000);
//     }, []);
  
//     return (
//       <main>
//         <div>
//           <img src={Product.img} alt={Product.title} width={360} height={450} />
//         </div>
//         <div>
//           <h2>Black Friday</h2>
//           <h3>{Product.price}</h3>
//         </div>
//         <div>
//           <span>Lo que tenes que saber de este producto:</span>
//           <ul>
//             {Product.description.map((item) => (
//               <li key={item}>{item}</li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <MercadoPagoButton product={Product} />
//         </div>
//         {notification.isOpen && (
  
