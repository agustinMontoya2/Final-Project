'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FormValues, ICategory, IProducts, IUserSession } from '@/interfaces/productoInterface';
import React from 'react';
import { editProductImg, postProduct } from '@/Helpers/products.helper';
import { useRouter } from "next/navigation";
import { getCategories } from '@/lib/server/Categories';

const FormularioMenu = () => {
    const router = useRouter();
    const [productImgFile, setProductImgFile] = useState<File | null>(null);
    const [imagenPreview, setImagePreview]  = useState<string | null>(null);
    const [formValues, setFormValues] = useState<FormValues>({
        product_name: '',
        description: '',
        price: "",
        image_url: "",
        avaliable: true,
        category_id: "",

    });
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const session = localStorage.getItem('userSession');
        if (session) {
            const parsedSession = JSON.parse(session);
            setUserSession(parsedSession);
        }
    }, [router]);

    useEffect(() => {
        const storedUserData = JSON.parse(window.localStorage.getItem("userSession") || "{}");
        if (storedUserData.user) {
            setUserId(storedUserData.user.user_id);
            setToken(storedUserData.token);
        }
    }, []);

    const fetchCategories = async () => {
        try {
            const categoriesData: ICategory[] = await getCategories();
            console.log(categoriesData)
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [userSession]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "category") {
            const selectedCategory = categories.find(cat => cat.category_id === value);
            setFormValues({
                ...formValues,

                category_id: selectedCategory?.category_id || "",


            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        if (!formValues.category_id || typeof formValues.category_id !== 'string') {
            console.error("Invalid category_id");
            return;
        }

        const product = {
            product_name: formValues.product_name,
            description: formValues.description,
            price: parseFloat(formValues.price),
            // image_url: formValues.image_url ? formValues.image_url.name : "",
            category_id: formValues.category_id,
            // reviews: [],
            available: formValues.avaliable,
        };
        console.log("Type of category_id:", typeof product.category_id);

        console.log("Product data being sent:", product)

        try {
            const response = await postProduct(token, product);
            if(response.product_id && productImgFile) {
                await editProductImg(productImgFile, token, response.product_id);
                console.log(productImgFile)
                console.log(response, "producto imagen")
            }
            editProductImg
            console.log(response);
            setFormValues({
                product_name: '',
                description: '',
                price: "",
                image_url: "",
                avaliable: true,
                category_id: '',

            });
            console.log("Type of category_id:", typeof product.category_id);

            alert("El producto se ha agregado correctamente");
        } catch (error: any) {
            console.error(error.message, "Error al agregar el producto");
            throw new Error("El pedido no pudo procesarse");
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <h2 className="w-full text-xl text-center text-neutral-800 font-extrabold">Add dish</h2>
                <div className="w-4/5 mb-6 relative">
                    <input
                        type="text"
                        name="product_name"
                        id="name"
                        placeholder="Name"
                        value={formValues.product_name}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="name"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${formValues.product_name ? 'top-[4px] text-xs' : ''}`}
                    >
                        Name
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Description"
                        value={formValues.description}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="descripcion"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${formValues.description ? 'top-[4px] text-xs' : ''}`}
                    >
                        Description
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder="Price"
                        value={formValues.price}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="price"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${formValues.price ? 'top-[4px] text-xs' : ''}`}
                    >
                        Price
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <label htmlFor="categoria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                        Category
                    </label>
                    <select
                        id="categoria"
                        name="category"
                        value={formValues.category_id} // Ahora es un string, no un array
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id.toString()}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-4/5 mb-6 relative">
    <label htmlFor="imagen" className="w-full flex flex-col items-center p-4 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-200 transition">
        <span className="text-gray-600">Click to upload an image</span>
        {imagenPreview ? (
            <img src={imagenPreview} alt="Imagen subida" className="w-full h-40 object-cover mt-2" />
        ) : (
            <span className="mt-2 text-gray-500 text-sm">No file selected</span>
        )}
    </label>
    <input id="imagen" type="file" onChange={handleFileChange} className="hidden" required />
</div>

                <button
                    type="submit"
                    className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Add dish
                </button>
            </form>
        </div>
    );
};

export default FormularioMenu;
