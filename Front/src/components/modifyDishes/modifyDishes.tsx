"use client";

import { getProductsDB } from "@/Helpers/products.helper";
import { IProducts, ICategory } from "@/interfaces/productoInterface";
import Image from "next/image";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { postProduct } from "@/Helpers/products.helper";
import { getCategories } from '@/lib/server/Categories';

const ModifyDishes = () => {
    const router = useRouter();
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        descripcion: '',
        price: '',
        imagen: null,
        avaliable: true,
        category: {
            category_id: '',
            category_name: ''
        }
    });
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const storedUserData = window.localStorage.getItem("userSession");
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            if (parsedData && parsedData.user) {
                setUserId(parsedData.user.user_id);
                setToken(parsedData.token);
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
        setFormValues({
            name: product.product_name,
            descripcion: product.description,
            price: product.price.toString(),
            imagen: null,
            avaliable: product.available,
            category: {
                category_id: "",
                category_name: " "
            }
        });
        setIsFormOpen(true);
    };

    const handleDelete = (productId: string) => {
        // Implementa la lógica para eliminar un plato
        console.log("Eliminar plato con ID:", productId);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "category") {
            const selectedCategory = categories.find(cat => cat.category_id === value);
            setFormValues(prevValues => ({
                ...prevValues,
                category: {
                    category_id: selectedCategory?.category_id || "",
                    category_name: selectedCategory?.category_name || ""
                }
            }));
        } else {
            setFormValues(prevValues => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormValues(prevValues => ({
                ...prevValues,
                imagen: e.target.files[0],
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!token) {
            console.error("Token is required");
            return;
        }

        const product = {
            product_name: formValues.name,
            description: formValues.descripcion,
            price: parseFloat(formValues.price),
            image_url: formValues.imagen ? formValues.imagen.name : "",
            category: {
                category_id: formValues.category.category_id,
                category_name: formValues.category.category_name
            },
            reviews: [],
            available: formValues.avaliable,
        };

        console.log("Product data being sent:", product);

        try {
            const response = await postProduct(token, product);
            console.log(response);
            setFormValues({
                name: '',
                descripcion: '',
                price: '',
                imagen: null,
                avaliable: true,
                category: {
                    category_id: '',
                    category_name: ''
                }
            });
            alert("El producto se ha modificado correctamente");
            fetchProducts();
            setIsFormOpen(false);
        } catch (error: any) {
            console.error(error.message, "Error al modificar el producto");
        }
    };

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

            <div className="w-[60%] h-auto grid grid-cols-1 sm:grid-cols-2 gap-6 justify-evenly m-auto">
                {products
                    .filter(product => product.product_name.toLowerCase().includes(searchTerm.toLowerCase())) // Filtrado por nombre
                    .map((product) => (
                        <div key={product.product_id} className="relative w-36 flex justify-center items-center">
                            <Image
                                src={product.image_url}
                                alt={product.product_name}
                                width={80}
                                height={80}
                                className="w-full h-auto rounded-md"
                            />
                            <div className="w-2/3 pl-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-black text-xl font-semibold">{product.product_name}</h2>
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <button
                                        className="bg-secondary px-3 py-1 rounded-md hover:bg-red-700"
                                        onClick={() => handleModify(product)} // Pasa el producto al modificar
                                    >
                                        Modify
                                    </button>
                                    <button
                                        className="bg-secondary px-3 py-1 rounded-md hover:bg-red-700"
                                        onClick={() => handleDelete(product.product_id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Formulario de modificación */}
            {isFormOpen && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                        <h2 className="w-full text-xl text-center text-neutral-800 font-extrabold">Modify Dish</h2>
                        <div className="w-4/5 mb-6 relative">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formValues.name}
                                onChange={handleChange}
                                className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                                required
                            />
                        </div>
                        <div className="w-4/5 mb-6 relative">
                            <textarea
                                name="descripcion"
                                placeholder="Description"
                                value={formValues.descripcion}
                                onChange={handleChange}
                                className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                                required
                            />
                        </div>
                        <div className="w-4/5 mb-6 relative">
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formValues.price}
                                onChange={handleChange}
                                className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                                required
                            />
                        </div>
                        <div className="w-4/5 mb-6 relative">
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formValues.category.category_id}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map(category => (
                                    <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-4/5 mb-6 relative">
                            <input
                                type="file"
                                name="imagen"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                            />
                        </div>
                        <div className="flex justify-between w-full mt-4">
                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="text-neutral-700 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ModifyDishes;
