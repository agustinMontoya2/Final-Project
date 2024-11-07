"use client";

import { getProductsDB } from "@/Helpers/products.helper";
import { IProducts, IFavorities, IFilter, IUserSession } from "@/interfaces/productoInterface";
import Image from "next/image";
import { useEffect, useState } from "react";
import { addFavorities, removeFavorities, getFavorities } from "@/Helpers/favorities";
import { addCart } from "@/Helpers/cart";
import Link from 'next/link';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Carousel from "@/components/Carrusel/Carrusel";
import Loading from '@/lib/Loading/Loading'

const Cards = () => {
    const router = useRouter();
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<IFilter>({
        category: [],
        showFavorites: false,
        priceOrder: "",
    });
    const [setData, setUserData] = useState<IUserSession>()
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [favorities, setFavorities] = useState<IFavorities>();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Cambiado a 15


    useEffect(() => {
        if (typeof window !== "undefined"){
            const storeUserData = window.localStorage.getItem("userSession");
            if(storeUserData){
                const parseData = JSON.parse(storeUserData)
                if(parseData && parseData.user)
                    setUserId(parseData.user.user_id);
                setToken(parseData.token)
                fetchProducts()
                fetchFavorities()
            }
        }
    }, [router]);

    useEffect(() => {
        const loadData = async () => {
            if (userId && token) {
                await fetchFavorities();
            }
            fetchProducts();
        };
        loadData();
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
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error al obtener favoritos", error.message);
                } else {
                    console.error("An unknown error occurred:", error);
                }
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
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error al agregar favoritos", error.message);
                } else {
                    console.error("An unknown error occurred:", error);
                }
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
                    timer: 1000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Product has not been added to the cart',
                    toast: true,
                    position: 'top-end',
                    timer: 1000,
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

    const images = [
        "/assets/sunday.jpeg",
        "/assets/monday.jpeg",
        "/assets/tuesday.jpeg",
        "/assets/wednesday.jpeg",
        "/assets/thursday.jpeg",
        "/assets/friday.jpeg",
        "/assets/saturday.jpeg",
    ];

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <div className="pt-5 rounded-lg">
            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        <div className="flex flex-col">
                            <div className="w-4/5 flex md:flex-col m-auto">
                                <div className="w-1/2 h-10 m-auto flex justify-between mb-4 flex-wrap gap-2 md:hidden">
                                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center bg-white text-red-600 font-medium py-1 px-3 rounded">
                                        Filters
                                        <Image src={'/assets/icon/down.png'} width={20} height={20} alt="down" className="ml-2"/>
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute bg-white border rounded-lg z-20 shadow-lg p-3">
                                            <div className="flex mb-2">
                                                <Image src={'/assets/icon/crossblack.png'} width={15} height={15} alt="cross" onClick={() => setIsDropdownOpen(false)} className="w-5 h-5"/>
                                                <span className="font-bold text-neutral-800 ml-6">Filters</span>
                                            </div>
                                            <hr className="border-neutral-600"/>
                                            <div className="flex flex-col">
                                                <button onClick={() => toggleCategory("Beverages")} className={`font-medium py-1 rounded ${filters.category.includes("Beverages") ? "bg-red-800 text-white" : "bg-white text-red-600"}`}>
                                                    Beverages
                                                </button>
                                                <hr className="border-neutral-600"/>
                                                <button onClick={() => toggleCategory("Main Dishes")} className={`font-medium py-1 rounded ${filters.category.includes("Main Dishes") ? "bg-red-800 text-white" : "bg-white text-red-600"}`}>
                                                    Main Dishes
                                                </button>
                                                <hr className="border-neutral-600"/>
                                                <button onClick={() => toggleCategory("Appetizers")} className={`font-medium py-1 rounded ${filters.category.includes("Appetizers") ? "bg-red-800 text-white" : "bg-white text-red-600"}`}>
                                                    Appetizers
                                                </button>
                                                <hr className="border-neutral-600"/>
                                                <button onClick={() => toggleCategory("Sides")} className={`font-medium py-1 rounded ${filters.category.includes("Sides") ? "bg-red-800 text-white" : "bg-white text-red-600"}`}>
                                                    Sides
                                                </button>
                                                <hr className="border-neutral-600"/>
                                                <button onClick={() => toggleCategory("Desserts")} className={`font-medium py-1 rounded ${filters.category.includes("Desserts") ? "bg-red-800 text-white" : "bg-white text-red-600"}`}>
                                                    Desserts
                                                </button>
                                                <hr className="border-neutral-600"/>
                                                <button onClick={() => setFilters({ ...filters, priceOrder: "asc" })} className={`font-medium py-1 rounded ${filters.priceOrder === "asc" ? "bg-red-800 text-white" : "bg-white text-red-600"}`}>
                                                    Price: Low to High
                                                </button>
                                                <hr className="border-neutral-600"/>
                                                <button onClick={() => setFilters({ ...filters, priceOrder: "desc" })} className={`font-medium py-1 rounded ${filters.priceOrder === "desc" ? "bg-red-800 text-white" : "bg-white text-red-600"}`}>
                                                    Price: High to Low
                                                </button>
                                                <hr className="border-neutral-600"/>
                                                <button onClick={() => setFilters({ ...filters, showFavorites: !filters.showFavorites })} className="bg-white text-red-600 hover:bg-neutral-100 font-medium py-1 rounded">
                                                    {filters.showFavorites ? "Watch all" : "Watch favorites"}
                                                </button>
                                                <button onClick={clearFilters} className="bg-gray-500 text-white font-bold py-1 px-3 rounded hover:bg-gray-600">Clear Filter</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="md:w-1/3 w-full mt-10 md:mt-0 m-auto mb-4 flex items-center border rounded-lg bg-white text-red-600">
                                    <Image
                                        src="/assets/icon/search.png"
                                        alt="Search"
                                        width={20}
                                        height={20}
                                        className="ml-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search dish..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="border-none rounded-lg outline-none px-2 py-2 text-gray-700 w-full"
                                    />
                                </div>
                            </div>
                            <div className="hidden md:flex w-4/5 m-auto justify-center mb-4 flex-wrap gap-2">
                                <button onClick={() => toggleCategory("Beverages")} className={`font-medium py-1 px-3 rounded ${filters.category.includes("Beverages") ? "bg-red-800 text-white hover:bg-red-800" : "bg-white text-red-600 hover:bg-neutral-100"}`}>Beverages</button>
                                <button onClick={() => toggleCategory("Main Dishes")} className={`font-medium py-1 px-3 rounded ${filters.category.includes("Main Dishes") ? "bg-red-800 text-white hover:bg-red-800" : "bg-white text-red-600 hover:bg-neutral-100"}`}>Main Dishes</button>
                                <button onClick={() => toggleCategory("Appetizers")} className={`font-medium py-1 px-3 rounded ${filters.category.includes("Appetizers") ? "bg-red-800 text-white hover:bg-red-800" : "bg-white text-red-600 hover:bg-neutral-100"}`}>Appetizers</button>
                                <button onClick={() => toggleCategory("Sides")} className={`font-medium py-1 px-3 rounded ${filters.category.includes("Sides") ? "bg-red-800 text-white hover:bg-red-800" : "bg-white text-red-600 hover:bg-neutral-100"}`}>Sides</button>
                                <button onClick={() => toggleCategory("Desserts")} className={`font-medium py-1 px-3 rounded ${filters.category.includes("Desserts") ? "bg-red-800 text-white hover:bg-red-800" : "bg-white text-red-600 hover:bg-neutral-100"}`}>Desserts</button>
                                <button onClick={() => toggleCategory("glutenFree")} className={`font-medium py-1 px-3 rounded ${filters.category.includes("glutenFree") ? "bg-red-800 text-white hover:bg-red-800" : "bg-white text-red-600 hover:bg-neutral-100"}`}>Gluten Free</button>
    
                                <button onClick={() => setFilters({ ...filters, priceOrder: "asc" })} className={`font-medium py-1 px-3 rounded ${filters.priceOrder === "asc" ? "bg-red-800 text-white hover:bg-red-800" : "bg-white text-red-600 hover:bg-neutral-100"}`}>
                                    Price: Low to High
                                </button>
                                <button onClick={() => setFilters({ ...filters, priceOrder: "desc" })} className={`font-medium py-1 px-3 rounded ${filters.priceOrder === "desc" ? "bg-red-800 text-white hover:bg-red-800" : "bg-white text-red-600 hover:bg-neutral-100"}`}>
                                    Price: High to Low
                                </button>
    
                                <button onClick={() => setFilters({ ...filters, showFavorites: !filters.showFavorites })} className="bg-white text-red-600 hover:bg-neutral-100 font-medium py-1 px-3 rounded">
                                    {filters.showFavorites ? "Watch all" : "Watch favorites"}
                                </button>
                                <button onClick={clearFilters} className="bg-gray-500 text-white font-bold py-1 px-3 rounded hover:bg-gray-600">Clear Filter</button>
                            </div>
                        </div>
    
                        <Carousel images={images}/>
    
                        <div className="md:w-3/5 w-4/5 h-auto mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-evenly m-auto">
                            {paginatedProducts.map((product) => (
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
                                        <p className="text-black text-sm line-clamp-2...">{product.description}</p>
                                        <div className="mt-2">
                                            <span className="text-black text-lg font-semibold">{product.price} USD</span>

                                            <button
                                                className="bg-secondary px-3 ml-24 py-1 rounded-md hover:bg-red-700"
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
    
                        <div className="flex justify-center mt-4 py-3 pb-20">
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)} 
                                disabled={currentPage === 1} 
                                className="px-4 py-2 bg-red-600 text-white rounded mr-2">
                                Prev
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => handlePageChange(index + 1)} 
                                    className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-red-600 text-white' : 'bg-white text-red-600'}`}>
                                    {index + 1}
                                </button>
                            ))}
                            <button 
                                onClick={() => handlePageChange(currentPage + 1)} 
                                disabled={currentPage === totalPages} 
                                className="px-4 py-2 bg-red-600 text-white rounded ml-2">
                                Next
                            </button>
                        </div>
                    </>
                )
            }
        </div>
    );
    
};

export default Cards;
