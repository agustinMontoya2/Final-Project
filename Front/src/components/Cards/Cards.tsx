"use client";

import { getProductsDB } from "@/Helpers/products.helper";
import { IProducts } from "@/interfaces/productoInterface";
import Image from "next/image";
import { useEffect, useState } from "react";
import { addFavorities, removeFavorities, getFavorities } from "@/lib/server/favorities";
import { addCart } from "@/lib/server/cart";
import ProductFilter from "../Filter/Filter";
import starOutline from '../../../public/assets/icon/staroutline.png';
import starFilled from '../../../public/assets/icon/star.png';
import Link from "next/link";
import Swal from "sweetalert2";

const Cards = () => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
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

    const handleAddCart = async (productId: string) => {
        if (token && userId) {
            try {
                await addCart(userId, productId, token);
                setCart((prevCart) => [...prevCart, productId]);
                Swal.fire({
                    title: 'Dish added correctly.',
                    icon: 'success',
                    confirmButtonText: 'accept',
                    confirmButtonColor: "#1988f0"
                })
            } catch (error: any) {
                console.error("Error al agregar al carrito", error.message);
            }
        } else {
            Swal.fire({
                title: 'To add the product to the cart, log in.',
                icon: 'warning',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
        }
    };

    const handleAddToFavorities = async (productId: string, isFavorited: boolean) => {
        if (token && userId) {
            try {
                if (isFavorited) {
                    await removeFavorities(userId, productId, token);
                    setFavorities((prevFavorities) => prevFavorities.filter((id) => id !== productId));
                } else {
                    await addFavorities(userId, productId, token);
                    setFavorities((prevFavorities) => [...prevFavorities, productId]);
                }
            } catch (error: any) {
                console.error("Error al agregar favoritos", error.message);
            }
        } else {
            Swal.fire({
                title: 'To add to favorites, log in.',
                icon: 'warning',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
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
            <ProductFilter
                filter={filter}
                setFilter={setFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <div className="w-[80%] h-auto flex flex-wrap justify-evenly m-auto">
                {filteredProducts.map((product) => (
                    <div className="w-[30%] h-44 flex items-center bg-primary shadow-2xl rounded-xl my-6 px-5 hover:scale-105 duration-500">
                        <Link key={product.product_id} href={`/product/${product.product_id}`} className="w-1/2">
                            <div className="relative w-36 h-36">
                                <Image
                                    src={product.image_url}
                                    alt={product.product_name}
                                    layout="fill"
                                    objectFit="contain"
                                    className="w-full h-auto"
                                />
                            </div>
                        </Link>
                        <div className="w-1/2">
                            <div>
                                <div className="flex">
                                    <h2 className="w-10/12 text-black text-xl font-semibold">{product.product_name}</h2>
                                    <button
                                        className="w-2/12 filter dark-gray flex justify-end"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToFavorities(product.product_id, favorities.includes(product.product_id));
                                        }}
                                    >
                                        <Image
                                            src={favorities.includes(product.product_id) ? starFilled : starOutline}
                                            alt={favorities.includes(product.product_id) ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
                                            width={24}
                                            height={24}
                                        />
                                    </button>
                                </div>
                                
                                <p className="w-full text-black text-sm line-clamp-2">
                                    <b>Description:</b> {product.description}
                                </p>
                            </div>
                            <div className="w-full flex justify-between items-center">
                                <p className="text-black text-sm"><b>Price:</b> ${product.price}</p>

                                <button
                                    className="bg-secondary px-3 py-1 rounded-md hover:bg-red-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddCart(product.product_id);
                                    }}
                                >
                                    <Image src={"/assets/icon/cart.png"} width={20} height={20} alt="comprar" />
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
