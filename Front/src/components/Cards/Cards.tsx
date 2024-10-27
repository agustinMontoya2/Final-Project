"use client";

import { getProductsDB } from "@/Helpers/products.helper";
import { IProducts, ICart, IFavorities, IFilter } from "@/interfaces/productoInterface";
import Image from "next/image";
import { useEffect, useState } from "react";
import { addFavorities, removeFavorities, getFavorities } from "@/lib/server/favorities";
import { addCart } from "@/lib/server/cart";
import Link from 'next/link';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Loading from "../Loading/Loading";
import Carousel from "@/components/Carrusel/Carrusel";

const Cards = () => {
    const router = useRouter();
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<IFilter>({
        category:[],
        showFavorites: false,
        priceOrder: "",
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
            Swal.fire({
                title: 'Log in to manage Favorite',
                icon: 'info',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
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
            Swal.fire({
                title: 'Log in to add product to cart.',
                icon: 'info',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
            router.push("/login");
        }
    };

    const clearFilters = () => {
        setFilters({
            category: [],
            showFavorites: false,
            priceOrder: "",
        });
        setSearchTerm("");
    };

    const toggleCategory = (category: string) => {
        setFilters((prevFilters) => {
            const { category: selectedCategories } = prevFilters;
            if (selectedCategories.includes(category)) {
                return {
                    ...prevFilters,
                    category: selectedCategories.filter((cat) => cat !== category),
                };
            } else {
                return {
                    ...prevFilters,
                    category: [...selectedCategories, category],
                };
            }
        });
    };
    

    const filteredProducts = products
    .filter((product) => {
        const matchesCategory = filters.category.length
            ? filters.category.includes(product.category.category_name)
            : true;
        const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
        const isFavorite = filters.showFavorites
            ? favorities?.product?.some((favoriteProduct) => favoriteProduct.product_id === product.product_id)
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

        return (
            <div className="pt-5 rounded-lg">
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
                    <button onClick={() => toggleCategory("Beverages")} className="...">Beverages</button>
                    <button onClick={() => toggleCategory("Main Dishes")} className="...">Main Dishes</button>
                    <button onClick={() => toggleCategory("Appetizers")} className="...">Appetizers</button>
                    <button onClick={() => toggleCategory("Sides")} className="...">Sides</button>
                    <button onClick={() => toggleCategory("Desserts")} className="...">Desserts</button>
                    <button onClick={() => setFilters({ ...filters, priceOrder: "asc" })} className="bg-white text-red-600 font-medium py-1 px-3 rounded hover:bg-neutral-100 focus:bg-secondary focus:text-white">Price: Low to High</button>
                    <button onClick={() => setFilters({ ...filters, priceOrder: "desc" })} className="bg-white text-red-600 font-medium py-1 px-3 rounded hover:bg-neutral-100 focus:bg-secondary focus:text-white">Price: High to Low</button>
                    <button onClick={() => setFilters({ ...filters, showFavorites: !filters.showFavorites })} className="bg-white text-red-600 font-medium py-1 px-3 rounded hover:bg-neutral-100 focus:bg-secondary">
                        {filters.showFavorites ? "Watch all" : "Watch favorites"}
                    </button>
                    <button onClick={clearFilters} className="bg-gray-500 text-white font-bold py-1 px-3 rounded hover:bg-gray-600">Clear Filter</button>
                </div>
        
                <Carousel images={images}/>
        
                <div className="w-[60%] h-auto grid grid-cols-1 sm:grid-cols-2 gap-6 justify-evenly m-auto">
                    {filteredProducts.map((product) => (
                        <div key={product.product_id} className="flex items-center shadow-2xl rounded-xl p-4 hover:scale-105 duration-500 bg-primary">
                            <Link href={`/product/${product.product_id}`}>
                                <div className="relative w-36 flex justify-center items-center">
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
                            <div className="w-2/3 pl-4">
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
                                            height={24}
                                        />
                                    </button>
                                </div>
                                <p className="text-black text-sm line-clamp-2 mb-2">
                                    <b>Description:</b> {product.description}
                                </p>
                                <div className="w-full flex justify-between items-center">
                                    <p className="text-black text-sm"><b>Price:</b> ${product.price}</p>
        
                                    <button
                                        className="bg-secondary px-3 py-1 rounded-md hover:bg-red-700"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddCart(product.product_id);
                                        }}
                                    >
                                        <Image src="/assets/icon/cart.png" width={20} height={20} alt="comprar" />
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
