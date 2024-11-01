"use client";

import { editProductImg, getProductsDB, removeProduct } from "@/Helpers/products.helper";
import { IProducts, ICategory } from "@/interfaces/productoInterface";
import Image from "next/image";
import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { getCategories } from '@/Helpers/Categories';
import Swal from "sweetalert2";
import EditDishForm from "@/components/EditDishForm/EditDishForm";

const ModifyDishes = () => {
    const router = useRouter();
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [token, setToken] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserData = window.localStorage.getItem("userSession");
            if (storedUserData) {
                const parsedData = JSON.parse(storedUserData);
                if (parsedData && parsedData.user) {
                    setToken(parsedData.token);
                }
            }
        }
        fetchProducts();
        fetchCategories();
    }, [router]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const productsData = await getProductsDB();
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const categoriesData: ICategory[] = await getCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleModify = (product: IProducts) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    };

    const handleDelete = async (productId: string) => {
        if (!token) {
            console.error("Token is required");
            return;
        }
        try {
            const response = await removeProduct(productId, token);
            Swal.fire({
                title: response.message,
                icon: 'success',
                timer: 1000,
            });
            fetchProducts();
        } catch {
            console.error("Error al eliminar el producto");
        }
    };

    const closeModal = () => {
        setIsFormOpen(false);
        setSelectedProduct(null);
    };

    if (loading) {
        return <div className="flex flex-col justify-center text-black">Loading menu...</div>;
    }

    return (
        <div className="h-screen overflow-y-scroll p-5">
            <div className="mb-5 text-center">
                <input
                    type="text"
                    placeholder="Search dish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 w-full max-w-md"
                />
            </div>

            <ul className="w-1/2 m-auto space-y-6">
                {products && Array.isArray(products) && products.length > 0 ? (
                    products
                        .filter(product => product.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((product) => (
                            <li key={product.product_id} className="flex items-center p-4 bg-white rounded-lg shadow-md">
                                <Image
                                    src={product.image_url}
                                    alt={product.product_name}
                                    width={120}
                                    height={120}
                                    className="rounded-md mr-4"
                                />
                                <div className="flex justify-between w-full">
                                    <div className="w-2/3 h-full">
                                        <h2 className="text-black text-xl font-semibold">{product.product_name}</h2>
                                        <p className="line-clamp-2">{product.description}</p>
                                    </div>
                                    <div className="flex flex-col justify-around items-center">
                                        <button
                                            className="flex bg-neutral-500 w-20 h-8 justify-center items-center px-2 rounded-md hover:bg-neutral-600 text-white"
                                            onClick={() => handleModify(product)}
                                        >
                                            Edit
                                            <Image src={'/assets/icon/pencilwhite.png'} width={20} height={20} alt="edit" className="ml-2" />
                                        </button>
                                        <button
                                            className="bg-secondary w-20 h-8 justify-center items-center px-2 rounded-md hover:bg-red-700 text-white"
                                            onClick={() => handleDelete(product.product_id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                ) : (
                    <p>No products found</p>
                )}
            </ul>

            {isFormOpen && (
                <div className="fixed inset-0 mt-16 flex items-center justify-center bg-black bg-opacity-50">
                    <EditDishForm
                        selectedProduct={selectedProduct}
                        categories={categories}
                        token={token}
                        onClose={closeModal}
                        onUpdate={fetchProducts}
                    />
                </div>
            )}
        </div>
    );
}

export default ModifyDishes;
