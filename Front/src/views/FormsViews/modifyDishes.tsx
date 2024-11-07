"use client";

import { editProductImg, getProductsDB, removeProduct } from "@/Helpers/products.helper";
import { IProducts, ICategory } from "@/interfaces/productoInterface";
import Image from "next/image";
import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { getCategories } from '@/Helpers/Categories';
import Swal from "sweetalert2";
import EditDishForm from "@/components/EditDishForm/EditDishForm";
import '../../styles/scrollbar.css'

const ModifyDishes = () => {
    const router = useRouter();
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [token, setToken] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // Cambiado a 15

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

    const paginatedProducts = products
        .filter(product => product.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const totalPages = Math.ceil(products.length / itemsPerPage);

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
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                const response = await removeProduct(productId, token);
                Swal.fire({
                    title: response.message,
                    icon: 'success',
                    timer: 1000,
                });

                fetchProducts();
            }
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
        <div className="h-screen overflow-y-scroll scrollbar-custom p-5">
            <div className="md:w-1/3 w-11/12 mt-10 md:mt-0 m-auto mb-4 flex items-center border rounded-lg bg-white text-red-600">
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

            <ul className="w-11/12 md:w-1/2 m-auto space-y-6">
                {paginatedProducts && Array.isArray(paginatedProducts) && paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
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
                                    <h2 className="text-black text-lg md:text-xl font-semibold">{product.product_name}</h2>
                                    <p className="text-neutral-800 line-clamp-2">{product.description}</p>
                                </div>
                                <div className="hidden md:flex flex-col justify-around items-center">
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

            {/* Paginación */}
            <div className="flex justify-center mt-4">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 bg-gray-300 rounded-lg"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-2 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-2 bg-gray-300 rounded-lg"
                >
                    Next
                </button>
            </div>

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
