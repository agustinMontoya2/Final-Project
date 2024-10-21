"use client";

import { getProductsDB } from "@/Helpers/products.helper";
import { IProducts, ICart, IFavorities } from "@/interfaces/productoInterface";
import Image from "next/image";
import { useEffect, useState } from "react";
import { addFavorities, removeFavorities, getFavorities } from "@/lib/server/favorities";
import { addCart } from "@/lib/server/cart";
import Link from 'next/link'

const Cards = () => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [favorities, setFavorities] = useState<IFavorities>(); 
    const [cart, setCart] = useState<ICart>(); 
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        const storedUserData = window.localStorage.getItem("userSession");
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            if (parsedData && parsedData.user) {
                setUserId(parsedData.user.user_id);
                setToken(parsedData.token);
                fetchProducts()
                fetchFavorities()
            }
        }
    }, []);

    useEffect(() => {
        if (userId && token) {
            fetchProducts();
            fetchFavorities();
        }
    }, [userId, token]);

    
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


  

    const fetchFavorities = async () => {
        if (token && userId) {
            try {
                const favoritiesData = await getFavorities(userId, token);
                setFavorities(favoritiesData);
            } catch (error) {
                console.error("Error al obtener favoritos", error.message);
            }
        }
        else {
        console.log("no hay token");}
        
    };


    const handleAddToFavorities = async (productId: string, isFavorited: boolean) => {
        alert(isFavorited)
        if (token && userId) {
            try {
                if (isFavorited) {
                    await removeFavorities(userId, productId, token);
                    await fetchFavorities();
                } else {
                    await addFavorities(userId, productId, token);
                    await fetchFavorities();
                }
            } catch (error) {
                console.error("Error al manejar favoritos", error.message);
            }
        } else {
            alert("Inicia sesión para manejar favoritos.");
        }
    };

    const handleAddCart = async (productId: string,) => {
        if (token && userId) {
            try {
                    await addCart(userId, productId, token);
                    alert("Product added to cart")
            } catch (error) {
                alert (`Error: ${error instanceof Error ? error.message : error}`);
                console.error("Error al agregar al carrito", error.message);
            }
        } else {
            alert("Inicia sesión para agregar al carrito.");
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesCategory = filter ? product.category.category_name === filter : true;
        const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
        const isFavorite = favorities?.product.some(favoriteProduct => favoriteProduct.product_id === product.product_id) || false;
        return matchesCategory && matchesSearch && (!showFavorites || isFavorite);
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
                <button onClick={() => setShowFavorites(!showFavorites)} className="mx-2 bg-secondary text-white py-1 px-3 rounded">{showFavorites ? "Watch all" : "Watch favorities"}</button>
                <button onClick={() => setFilter("")} className="mx-2 bg-gray-500 text-white py-1 px-3 rounded">Clear Filter</button>
            </div>
    
            <div className="w-[80%] h-auto flex flex-wrap justify-evenly m-auto">
                {filteredProducts.map((product) => (
                    <Link href={`/product/${product.product_id}`} key={product.product_id}>
                        <div className="w-[30%] h-44 flex items-center bg-primary shadow-2xl rounded-xl my-6 px-5 hover:scale-105 duration-500">
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
                                <div className="w-full flex justify-between items-center z-50">
                                    <p className="text-black text-sm"><b>Price:</b> ${product.price}</p>
                                    <button
                                        className="bg-secondary px-3 py-1 rounded-md hover:bg-red-700"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddCart(product.product_id);
                                        }}
                                    >
                                        Add to cart
                                    </button>
                                    <button
                                        className="bg-secondary px-3 py-1 rounded-md hover:bg-red-700"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToFavorities(product.product_id, favorities?.product.some(favoriteProduct => favoriteProduct.product_id === product.product_id));
                                        }}
                                    >
                                        {favorities?.product.some(favoriteProduct => favoriteProduct.product_id === product.product_id) ? "Delete from favorites" : "Add to favorites"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default Cards;
