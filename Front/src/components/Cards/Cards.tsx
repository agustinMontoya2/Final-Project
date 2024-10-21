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
                console.error("Error al obtener favoritos");
            }
        }
        else {
            console.log("no hay token");
        }

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
                console.error("Can't add to favorites");
            }
        } else {
            alert("Log in to manage Favorite");
        }
    };

    const handleAddCart = async (productId: string,) => {
        if (token && userId) {
            try {
                await addCart(userId, productId, token);
                alert("Product added to cart")
            } catch (error) {
                alert(`Error: ${error instanceof Error ? error.message : error}`);
                console.error("Fail to add to the cart.");
            }
        } else {
            alert("Log in to add product to cart.");
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesCategory = filter ? product.category.category_name === filter : true;
        const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
        const isFavorite = favorities?.product.some(favoriteProduct => favoriteProduct.product_id === product.product_id) || false;
        return matchesCategory && matchesSearch && (!showFavorites || isFavorite);
    });

    if (loading) {
        return <div className="flex flex-col justify-center text-black">Loading menu...</div>;
    }

    return (
        <div className="p-5 bg-gray-100 rounded-lg shadow-md">
            <div className="mb-5 text-center">
                <input
                    type="text"
                    placeholder="Search dish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 rounded border border-gray-300"
                />
            </div>

            <div className="flex justify-center mb-4">
                <button onClick={() => setFilter("Beverages")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Beverages</button>
                <button onClick={() => setFilter("Main Dishes")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Main Dishes</button>
                <button onClick={() => setFilter("Appetizers")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Appetizers</button>
                <button onClick={() => setFilter("Sides")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Sides</button>
                <button onClick={() => setFilter("Desserts")} className="mx-2 bg-secondary text-white py-1 px-3 rounded">Desserts</button>
                <button onClick={() => setShowFavorites(!showFavorites)} className="mx-2 bg-secondary text-white py-1 px-3 rounded">{showFavorites ? "Watch all" : "Watch favorites"}</button>
                <button onClick={() => setFilter("")} className="mx-2 bg-gray-500 text-white py-1 px-3 rounded">Clear Filter</button>
            </div>

            <div className="flex flex-wrap justify-center">
                {filteredProducts.map((product) => (
                    <div key={product.product_id} className="w-52 m-2 bg-white rounded-lg shadow-md p-2 transition-transform hover:scale-105">
                        <Link href={`/product/${product.product_id}`}>
                            <div className="text-center cursor-pointer">
                                <div className=" mx-auto overflow-hidden rounded-lg">
                                    <Image
                                        src={product.image_url}
                                        alt={product.product_name}
                                        layout="responsive"
                                        width={80}
                                        height={80}
                                        objectFit="contain"
                                    />
                                </div>
                                <h2 className="text-black text-lg">{product.product_name}</h2>
                            </div>
                        </Link>
                        <div className="text-left">
                            <p className="text-black">
                                <b>Description:</b> {product.description}
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-black"><b>Price:</b> ${product.price}</p>
                            <button
                                className="bg-secondary text-white p-2 rounded-md"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddCart(product.product_id);
                                }}
                            >
                                Add to cart
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToFavorities(product.product_id, favorities?.product.some(favoriteProduct => favoriteProduct.product_id === product.product_id) ?? false);
                                }}
                                className="bg-transparent border-none cursor-pointer text-gold text-2xl"
                            >
                                {favorities?.product.some(favoriteProduct => favoriteProduct.product_id === product.product_id) ? '★' : '☆'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Cards;
