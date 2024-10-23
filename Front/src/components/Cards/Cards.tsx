"use client";

import { getProductsDB } from "@/Helpers/products.helper";
import { IProducts, ICart, IFavorities } from "@/interfaces/productoInterface";
import Image from "next/image";
import { useEffect, useState } from "react";
import { addFavorities, removeFavorities, getFavorities } from "@/lib/server/favorities";
import { addCart } from "@/lib/server/cart";
import Link from 'next/link';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Cards = () => {
    const router = useRouter();
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: "",
        showFavorites: false,
        priceOrder: "" as "asc" | "desc" | "",
    });
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [favorities, setFavorities] = useState<IFavorities>();
    const [cart, setCart] = useState<ICart>();

    useEffect(() => {
        const storedUserData = window.localStorage.getItem("userSession");
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            if (parsedData && parsedData.user) {
                setUserId(parsedData.user.user_id);
                setToken(parsedData.token);
                fetchProducts();
                fetchFavorities();
            }
        }
    }, [router]);

    useEffect(() => {
        if (!userId && !token) {
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
            } catch (error: any) {
                console.error("Error al obtener favoritos", error.message);
            }
        } else {
            console.log("no hay token");
        }
    };

    const handleAddToFavorities = async (productId: string, isFavorited: boolean) => {
        if (token && userId) {
            try {
                if (isFavorited) {
                    await removeFavorities(userId, productId, token);
                    await fetchFavorities();
                } else {
                    await addFavorities(userId, productId, token);
                    await fetchFavorities();
                }
            } catch (error: any) {
                console.error("Error al manejar favoritos", error.message);
            }
        } else {
            alert("Log in to manage Favorite");
            router.push("/login");
        }
    };

    const handleAddCart = async (productId: string) => {
        if (token && userId) {
            try {
                await addCart(userId, productId, token);
                Swal.fire({
                    icon: 'success',
                    title: 'Product added to the cart',
                    toast: true,
                    position: 'top-end',
                    timer: 2500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Product has not been added to the cart',
                    toast: true,
                    position: 'top-end',
                    timer: 2500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
            }
        } else {
            alert("Log in to add product to cart.");
            router.push("/login");
        }
    };

    const clearFilters = () => {
        setFilters({
            category: "",
            showFavorites: false,
            priceOrder: "",
        });
        setSearchTerm("");
    };

    const filteredProducts = products
        .filter((product) => {
            const matchesCategory = filters.category ? product.category.category_name === filters.category : true;
            const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
            const isFavorite = filters.showFavorites
                ? favorities?.product.some((favoriteProduct) => favoriteProduct.product_id === product.product_id)
                : true;

            return matchesCategory && matchesSearch && isFavorite;
        })
        .sort((a, b) => {
            if (filters.priceOrder === "asc") {
                return Number(a.price) - Number(b.price);
            } else if (filters.priceOrder === "desc") {
                return Number(b.price) - Number(a.price);
            }
            return 0;
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
                    className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 w-full max-w-md"
                />
            </div>

            <div className="flex justify-center mb-4 flex-wrap gap-2">
                <button onClick={() => setFilters({ ...filters, category: "Beverages" })} className="bg-secondary text-white py-1 px-3 rounded hover:bg-secondary-dark">Beverages</button>
                <button onClick={() => setFilters({ ...filters, category: "Main Dishes" })} className="bg-secondary text-white py-1 px-3 rounded hover:bg-secondary-dark">Main Dishes</button>
                <button onClick={() => setFilters({ ...filters, category: "Appetizers" })} className="bg-secondary text-white py-1 px-3 rounded hover:bg-secondary-dark">Appetizers</button>
                <button onClick={() => setFilters({ ...filters, category: "Sides" })} className="bg-secondary text-white py-1 px-3 rounded hover:bg-secondary-dark">Sides</button>
                <button onClick={() => setFilters({ ...filters, category: "Desserts" })} className="bg-secondary text-white py-1 px-3 rounded hover:bg-secondary-dark">Desserts</button>
                <button onClick={() => setFilters({ ...filters, priceOrder: "asc" })} className="bg-secondary text-white py-1 px-3 rounded hover:bg-secondary-dark">Price: Low to High</button>
                <button onClick={() => setFilters({ ...filters, priceOrder: "desc" })} className="bg-secondary text-white py-1 px-3 rounded hover:bg-secondary-dark">Price: High to Low</button>
                <button onClick={() => setFilters({ ...filters, showFavorites: !filters.showFavorites })} className="bg-secondary text-white py-1 px-3 rounded hover:bg-secondary-dark">
                    {filters.showFavorites ? "Watch all" : "Watch favorites"}
                </button>
                <button onClick={clearFilters} className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600">Clear Filter</button>
            </div>

            <div className="w-[50%] h-auto grid grid-cols-1 sm:grid-cols-2 gap-6 justify-evenly m-auto">
                {filteredProducts.map((product) => (
                    <div key={product.product_id} className="flex items-center bg-primary shadow-2xl rounded-xl p-4 hover:scale-105 duration-500">
                        <div className="w-1/2">
                            <Link href={`/product/${product.product_id}`}>
                                <div className="relative w-36 h-36">
                                    <Image
                                        src={product.image_url}
                                        alt={product.product_name}
                                        layout="responsive"
                                        width={80}
                                        height={80}
                                        objectFit="contain"
                                        className="w-full h-auto rounded-md"
                                    />
                                </div>
                            </Link>
                        </div>

                        <div className="w-1/2 pl-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-black text-xl font-semibold">{product.product_name}</h2>
                                <button
                                    className="flex items-center justify-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToFavorities(
                                            product.product_id,
                                            favorities?.product.some(favoriteProduct => favoriteProduct.product_id === product.product_id) ?? false
                                        );
                                    }}>
                                    <Image
                                        src={favorities?.product.some(favoriteProduct => favoriteProduct.product_id === product.product_id)
                                            ? "/assets/icon/star.png"
                                            : "/assets/icon/staroutline.png"}
                                        alt="Favorite icon"
                                        width={24}
                                        height={24}/>
                                </button>
                            </div>
                            <p className="text-black font-medium">${Number(product.price).toFixed(2)}</p>
                            <button
                                onClick={() => handleAddCart(product.product_id)}
                                className="bg-secondary text-white rounded py-2 px-4 mt-2 hover:bg-secondary-dark">
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;
