"use client";

import { getProductsDB } from "@/Helpers/products.helper";
import { ICartData, IProducts, IUserSession } from "@/interfaces/productoInterface";
import { cart } from "@/lib/server/cart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addFavorities, removeFavorities, getFavorities } from "@/lib/server/favorities";
import { addCart } from "@/lib/server/cart";

const Cards = () => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
<<<<<<< HEAD
    const [userData,  setUserData] = useState<IUserSession>();


    useEffect(() => {
        console.log("Componente montado, verificando userSession...");
        const userData = localStorage.getItem("userSession");
        if (userData) {
            try {
                const parsedData = JSON.parse(userData);
                console.log("Datos de usuario parseados:", parsedData);
                setUserData(parsedData);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        } else {
            console.log("No se encontró userSession en localStorage");
=======
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [favorities, setFavorities] = useState<string[]>([]);
    const [cart, setCart] = useState<string[]>([]); 

    useEffect(() => {
        const storedUserData = window.localStorage.getItem("userSession");
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            if (parsedData && parsedData.user) {
                setUserId(parsedData.user.user_id);
                setToken(parsedData.token);
            }
>>>>>>> origin/front/development-jehiel
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProductsDB();
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

<<<<<<< HEAD
    const handleAddToCart = async (product: IProducts) => {
        if (!userData || !userData.user || !userData.user.id) {
            console.error("No se encontró información del usuario.");
            return;
        }
    
        const cartData: ICartData = {
            userId: userData.user.id, // Asegúrate de que esto sea una cadena
            order_type: "delivery", // Cambia según sea necesario
            products: [product], // Array de productos
        };
    
        try {
            const result = await cart(cartData);
            console.log("Producto agregado:", result);
        } catch (error) {
            console.error("Error al agregar producto:", error);
=======
    const handleGetFavorities = async (user_id: string, token: string) => {
        if (token && userId) {
            try {
                const favoritiesData = await getFavorities(userId, token);
                setFavorities(favoritiesData);
                console.log("Favoritos obtenidos:", favoritiesData);
            } catch (error) {
                console.error("Error al obtener favoritos", error.message);
            }
        } else {
            alert("Inicia sesión para ver favoritos.");
        }
    };

    const handleAddToFavorities = async (productId: string, isFavorited: boolean) => {
        console.log("Manejador de agregar a favoritos llamado");
        console.log(`userId: ${userId}`);
        console.log(`productId: ${productId}`);
        console.log(`isFavorited: ${isFavorited}`);

        if (token && userId) {
            try {
                if (isFavorited) {
                    console.log("Eliminando de favoritos...");
                    await removeFavorities(userId, productId, token);
                    setFavorities((prevFavorities) => prevFavorities.filter((id) => id !== productId));
                    console.log("Producto eliminado de favoritos:", productId);
                } else {
                    console.log("Agregando a favoritos...");
                    const result = await addFavorities(userId, productId, token);
                    setFavorities((prevFavorities) => [...prevFavorities, productId]);
                    console.log("Producto agregado a favoritos:", result);
                }
            } catch (error) {
                console.error("Error al agregar favoritos", error.message);
            }
        } else {
            alert("Inicia sesión para agregar favoritos.");
        }
    };

    const handleAddCart = async (productId: string) => {
        if (token && userId) {
            try {
                await addCart(userId, productId, token);
                setCart((prevCart) => [...prevCart, productId]);
                alert("Producto agregado al carrito");
            } catch (error) {
                console.error("Error al agregar al carrito", error.message);
            }
        } else {
            alert("Inicia sesión para agregar al carrito.");
>>>>>>> origin/front/development-jehiel
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesCategory = filter ? product.category.category_name === filter : true;
        const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    return (
        <div className="p-4">
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search dish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-gray-700"
                />
            </div>

            <div className="flex justify-center mb-4">
                <button onClick={() => setFilter("Beverages")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Beverages</button>
                <button onClick={() => setFilter("Main Dishes")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Main Dishes</button>
                <button onClick={() => setFilter("Appetizers")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Appetizers</button>
                <button onClick={() => setFilter("Sides")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Sides</button>
                <button onClick={() => setFilter("Desserts")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Desserts</button>
                <button onClick={() => setFilter("")} className="mx-2 bg-gray-500 text-white py-1 px-3 rounded">Clear Filter</button>
            </div>

            <div className="w-[80%] h-auto flex flex-wrap justify-evenly m-auto">
                {filteredProducts.map((product) => (
                    <div key={product.product_id} className="w-[30%] h-44 flex items-center bg-primary shadow-2xl rounded-xl my-6 px-5 hover:scale-105 duration-500">
                        <div className="w-1/2">
                            <div className="relative w-36 h-36">
                                <Image
                                    src={product.image_url}
                                    alt={product.product_name}
                                    layout="fill"
                                    objectFit="contain"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div>
                                <h2 className="text-black text-xl font-semibold">{product.product_name}</h2>
                                <p className="w-full text-black text-sm line-clamp-2">
                                    <b>Description:</b> {product.description}
                                </p>
                            </div>
                            <div className="w-full flex justify-between items-center">
                                <p className="text-black text-sm"><b>Price:</b> ${product.price}</p>

                                <button
                                    className="bg-secondary px-3 py-1 rounded-md hover:bg-red-700"
<<<<<<< HEAD
                                    onClick={() => handleAddToCart(product)}
=======
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        handleAddCart(product.product_id);
                                    }}
>>>>>>> origin/front/development-jehiel
                                >
                                    Agregar a Carrito
                                </button>

                                <button
                                    className="bg-secondary px-3 py-1 rounded-md hover:bg-red-700"
                                    onClick={(e) => {
                                        e.stopPropagation();  
                                        handleAddToFavorities(product.product_id, favorities.includes(product.product_id));
                                    }}
                                >
                                    {favorities.includes(product.product_id) ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;
