'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FormValues, ICategory, IUserSession } from '@/interfaces/productoInterface';
import React from 'react';
import { editProductImg, postProduct } from '@/Helpers/products.helper';
import { useRouter } from "next/navigation";
import { getCategories } from '@/Helpers/Categories';
import Image from 'next/image';
import Swal from 'sweetalert2';

const FormAddDish = () => {
    const router = useRouter();
    const [productImgFile, setProductImgFile] = useState<File | null>(null);
    const [imagenPreview, setImagePreview] = useState<string | null>(null);
    const [formValues, setFormValues] = useState<FormValues>({
        product_name: '',
        description: '',
        price: "",
        image_url: "",
        avaliable: true,
        category_id: "",

    });
    const [token, setToken] = useState<string | null>(null);
    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isDisable, setIsDisable] = useState<boolean>(false)

    useEffect(() => {
        if (typeof  window !== 'undefined') {

        const session = localStorage.getItem('userSession');
        if (session) {
            const parsedSession = JSON.parse(session);
            setUserSession(parsedSession);
        }
    }
    }, [router]);

    useEffect(() => {
        if (typeof  window !== 'undefined') {

        const storedUserData = JSON.parse(window.localStorage.getItem("userSession") || "{}");
        if (storedUserData.user) {
            setToken(storedUserData.token);
        }
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
            Swal.fire("Token is required", "Please log in to submit a dish.", "error");
            return;
        }

        // Validación de campos requeridos
        if (!formValues.product_name || !formValues.description || !formValues.price || !formValues.category_id || !productImgFile) {
            Swal.fire("Missing fields", "Please fill in all required fields.", "warning");
            return;
        }

        const product = {
            product_name: formValues.product_name,
            description: formValues.description,
            price: parseFloat(formValues.price),
            category_id: formValues.category_id,
            available: formValues.avaliable,
        };

        try {
            setIsDisable(true);
            const response = await postProduct(token, product);
            if (response.product_id && productImgFile) {
                await editProductImg(productImgFile, token, response.product_id);
            }

            // Limpiar el formulario
            setFormValues({
                product_name: '',
                description: '',
                price: "",
                image_url: "",
                avaliable: true,
                category_id: '',
            });

            Swal.fire({
                title: 'Dish added successfully',
                icon: 'success',
                timer: 1000,
            });

        } catch (error) {
            Swal.fire({
                title: 'Error adding dish',
                text: 'There was an issue adding the dish. Please try again.',
                icon: 'error',
            });
        } finally {
            setIsDisable(false);
        }
    };

    return (
        <div className="w-2/3 m-auto">
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl text-neutral-800 text-center font-extrabold">Add dish</h2>
            <div className="mb-6 relative">
                <input
                    type="text"
                    name="product_name"
                    id="name"
                    placeholder="Name"
                    value={formValues.product_name}
                    onChange={handleChange}
                    required
                    className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                />
                <label htmlFor="name" className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${formValues.product_name? 'top-[4px] text-xs' : ''}`}>Name</label>
            </div>
            <div className="mb-6 relative">
                <textarea
                    name="description"
                    id="description"
                    placeholder="Description"
                    value={formValues.description}
                    onChange={handleChange}
                    required
                    className="min-h-12 max-h-24  text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                />
                <label htmlFor="descripcion" className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${formValues.description? 'top-[4px] text-xs' : ''}`}>Description</label>
            </div>
            <div className="mb-6 relative">
                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                    value={formValues.price}
                    onChange={handleChange}
                    required
                    className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                />
                <label htmlFor="price" className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${formValues.price? 'top-[4px] text-xs' : ''}`}>Price</label>
            </div>
            <div className="mb-6 relative">
                <label htmlFor="categoria" className="block text-sm font-medium text-neutral-800">Category</label>
                <select
                    id="categoria"
                    name="category"
                    value={formValues.category_id}
                    onChange={handleChange}
                    required
                    className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pb-1"
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.category_id} value={category.category_id.toString()}>
                            {category.category_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-6 relative">
                <label htmlFor="imagen" className="flex flex-col items-center p-4 border-2 border-dashed border-neutral-800 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                    <span className='text-neutral-800'>Click to upload an image</span>
                    {imagenPreview ? (
                        <Image src={imagenPreview} alt="Imagen subida" height={300} width={300} className="w-full h-40 object-cover mt-2" />
                    ) : (
                        <span className="mt-2 text-gray-500 text-sm">No file selected</span>
                    )}
                </label>
                <input id="imagen" type="file" onChange={handleFileChange} className="hidden" accept='image/*' required />
            </div>

            <button
                type="submit"
                disabled={isDisable}
                className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
                {isDisable ? "Adding..." : "Add Dish"}
            </button>
        </form>
    </div>
    );
};

export default FormAddDish;
