'use client';

import { getProductsDB } from "@/Helpers/products.helper";
import { IProducts } from "@/interfaces/productoInterface";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cards = () => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);


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

    const handleAddToCart = async () => {
        console.log("se hizo click");
        // Aquí va la lógica de agregar al carrito
    };

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2 text-black flex justify-center text-center">Menu</h1>
            <div className="w-[80%] h-auto flex flex-wrap justify-evenly m-auto">
                {products.map((product) => (
                    <Link href={`/product/${product.product_id}`} key={product.product_id} className="w-[30%] h-44 flex items-center bg-primary shadow-2xl rounded-xl my-6 px-5 hover:scale-105 duration-500">
                            <div className="w-1/2">
                                <div className="relative w-36 h-36">
                                    <Image
                                        src={product.image_url}
                                        alt={product.name}
                                        layout="fill"
                                        objectFit="contain"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div>
                                    <h2 className="text-black text-xl font-semibold">Burger {product.name}</h2>
                                    <p className="w-full text-black text-sm line-clamp-2">
                                        <b>Description:</b>
                                        {product.description}
                                    </p>
                                </div>
                                <div className="w-full flex justify-between items-center z-50">
                                    <p className="text-black text-sm"><b>Price:</b> ${product.price}</p>
                                    <button
                                        className="bg-secondary px-3 py-1 rounded-md hover:bg-red-700"
                                        onClick={handleAddToCart}
                                    >
                                        Cart
                                    </button>
                                </div>
                            </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Cards;
