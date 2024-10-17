'use client';

import { getProductsDB } from "@/Helpers/products.helper";
import { IProducts } from "@/interfaces/productoInterface";
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
            <div className="flex flex-wrap">
                {products.map((product) => (
                    <Link href={`/product/${product.product_id}`} key={product.product_id}>
                        <div
                            className="flex items-center bg-third p-4 rounded-sm shadow-md m-1 w-full md:w-1/2 lg:w-1/3 relative hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-2 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 hover:after:bottom-0 hover:after:left-0 hover:after:blur-md hover:after:opacity-100 hover:after:transition-all"
                        >
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-32 h-32 object-cover rounded-lg mr-4"
                            />
                            <div>
                                <h2 className="text-black text-xl font-semibold">{product.name}</h2>
                                <p className="text-black text-sm font-semibold">{product.description}</p>
                                <p className="text-black">Price: ${product.price}</p>
                            </div>
                            <div>
                                <button
                                    className="bg-secondary"
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
