"use client";

import { editProductImg, getProductsDB, putProduct, removeProduct } from "@/Helpers/products.helper";
import { IProducts, ICategory } from "@/interfaces/productoInterface";
import Image from "next/image";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
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
            product_name: product.product_name,
            description: product.description,
            price: product.price.toString(),
            image_url: '',
            avaliable: product.available,
            category_id: product.category.category_id || ''
        });
        setImagePreview(product.image_url || '');
        setIsFormOpen(true);
    }
        ;

    const handleDelete = async (productId: string) => {
        if (!token) {
            console.error("Token is required");
            return;
        }
        try {
            const response = await removeProduct(productId, token);
            console.log(response);
            alert("El producto se ha eliminado correctamente");
            fetchProducts();
        } catch (error: any) {
            console.error(error.message, "Error al eliminar el producto");
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
            console.log("editado",editProduct);
            

            const response = await putProduct(token, selectedProduct.product_id, editProduct); // Asegúrate de que estás pasando el product_id correcto

            if (response.product_id && productImgFile) {
                await editProductImg(productImgFile, token, response.product_id);
                console.log(productImgFile);
            }
            console.log(response);
            alert("El producto se ha modificado correctamente");
            fetchProducts();
            setIsFormOpen(false);
        } catch (error: any) {
            console.error(error.message, "Error al modificar el producto");
        }
    };
    console.log("Token:", token);
    console.log("Selected Product ID:", selectedProduct?.product_id);
    console.log("Product data being sent:", products);

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
    
            <ul className="w-[60%] m-auto space-y-6">
                {products && Array.isArray(products) && products.length > 0 ? (
                    products
                        .filter(product => product.product_name.toLowerCase().includes(searchTerm.toLowerCase())) // Filtrado por nombre
                        .map((product) => (
                            <li key={product.product_id} className="flex items-center p-4 bg-white rounded-lg shadow-md">
                                <Image
                                    src={product.image_url}
                                    alt={product.product_name}
                                    width={80}
                                    height={80}
                                    className="w-20 h-20 rounded-md mr-4"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-black text-xl font-semibold">{product.product_name}</h2>
                                    <div className="mt-2 flex justify-between">
                                        <button
                                            className="flex bg-secondary px-3 py-1 rounded-md hover:bg-red-700"
                                            onClick={() => handleModify(product)} // Pasa el producto al modificar
                                        >
                                            Edit
                                            <Image src={'/assets/icon/pencilwhite.png'} width={20} height={20} alt="edit" className="ml-2"/>
                                        </button>
                                        <button
                                            className="bg-secondary px-3 py-1 rounded-md hover:bg-red-700"
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
    
            {/* Formulario de modificación */}
            {isFormOpen && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                        <h2 className="w-full text-xl text-center text-neutral-800 font-extrabold">Modify Dish</h2>
                        <div className="w-4/5 mb-6 relative">
                            <input
                                type="text"
                                name="product_name"
                                placeholder="Name"
                                value={formValues.product_name}
                                onChange={handleChange}
                                className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                                required
                            />
                        </div>
                        <div className="w-4/5 mb-6 relative">
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formValues.description}
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
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Select a category</label>
                            <select
                                id="category"
                                name="category"
                                value={formValues.category_id}
                                onChange={handleChange}
                                className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                            >
                                {categories.map(category => (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-4/5 mb-6 relative flex items-center">
                            <input
                                type="checkbox"
                                id="avaliable"
                                name="avaliable"
                                checked={formValues.avaliable}
                                onChange={(e) => setFormValues({ ...formValues, avaliable: e.target.checked })}
                                className="mr-2"
                            />
                            <label htmlFor="avaliable" className="text-neutral-700">Disponible</label>
                        </div>
                        <div className="w-4/5 mb-6 relative">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="imagen"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                            />
                        </div>
                        <div className="w-4/5 flex justify-center">
                            <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Save changes</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ModifyDishes;