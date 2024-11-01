"use client";

import { editProductImg, getProductsDB, putProduct, removeProduct } from "@/Helpers/products.helper";
import { IProducts, ICategory } from "@/interfaces/productoInterface";
import Image from "next/image";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getCategories } from '@/Helpers/Categories';
import Swal from "sweetalert2";
import '../../styles/scrollbar.css'

const ModifyDishes = () => {
    const router = useRouter();
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [token, setToken] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        product_name: '',
        description: '',
        price: '',
        image_url: '',
        avaliable: true,
        category_id: ''
    });
    const [productImgFile, setProductImgFile] = useState<File | null>(null);
    const [imagenPreview, setImagePreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        if (typeof window  !== 'undefined') {

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
        setFormValues({
            product_name: product.product_name,
            description: product.description,
            price: product.price.toString(),
            image_url: '',
            avaliable: product.available,
            category_id: product.category.category_id || ''
        });
        setImagePreview(product.image_url || '');
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
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "category") {
            const selectedCategory = categories.find(cat => cat.category_id === value);
            setFormValues({
                ...formValues,
                category_id: selectedCategory?.category_id || '',
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProductImgFile(file);
            const imgUrl = URL.createObjectURL(file);
            setImagePreview(imgUrl);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!token) {
            console.error("Token is required");
            return;
        }

        const editProduct = {
            product_name: formValues.product_name,
            description: formValues.description,
            price: parseFloat(formValues.price),
            category_id: formValues.category_id,
            available: formValues.avaliable,
        };

        console.log("Product data being sent:", editProduct);

        try {
            if (!selectedProduct || !selectedProduct.product_id) {
                console.error("Selected editProduct is not valid");
                return;
            }
            console.log("editado", editProduct);


            const response = await putProduct(token, selectedProduct.product_id, editProduct);

            if (response.product_id && productImgFile) {
                await editProductImg(productImgFile, token, response.product_id);
                console.log(productImgFile);
            }
            Swal.fire({
                title: 'product edited successfully',
                icon: 'success',
                timer: 1000,
            });
            fetchProducts();
            setIsFormOpen(false);
        } catch {
            console.error("Error al modificar el producto");
        }
    };
    console.log("Token:", token);
    console.log("Selected Product ID:", selectedProduct?.product_id);
    console.log("Product data being sent:", products);

    if (loading) {
        return <div className="flex flex-col justify-center text-black">Loading menu...</div>;
    }

    return (
        <div className="h-screen overflow-y-scroll p-5 scrollbar-custom">
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
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                        <li key={product.product_id} className="flex items-center p-4 bg-white rounded-lg shadow-md">
                            <Image
                                src={product.image_url}
                                alt={product.product_name}
                                width={120}
                                height={120}
                                className="rounded-md mr-4"
                            />
                            <div className="flex justify-between">
                                <div className="w-2/3 h-full">
                                    <h2 className="text-black text-xl font-semibold">{product.product_name}</h2>
                                    <p className="line-clamp-2">{product.description}</p>
                                </div>
                                <div className="flex flex-col justify-around items-center">
                                    <button
                                        className="bg-neutral-500 w-20 h-8 rounded-md hover:bg-neutral-600 text-white"
                                        onClick={() => handleModify(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-600 w-20 h-8 rounded-md hover:bg-red-700 text-white"
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
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)} // Botón para cambiar a la página seleccionada
                        className={`mx-1 px-4 py-2 border ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ModifyDishes;