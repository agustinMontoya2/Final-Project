'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FormValues, IProducts, IUserSession } from '@/interfaces/productoInterface';
import React from 'react';
import { postProduct } from '@/Helpers/products.helper';
import { useRouter } from "next/navigation";

const FormularioMenu = () => {
    const router = useRouter();
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        descripcion: '',
        price: '',
        imagen: null,
        avaliable: true
    });
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [userSession, setUserSession] = useState<IUserSession | null>(null);

    const category = {
        category_id: "03e9821788",
        category_name: "dessert"
    }

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



    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormValues({
                ...formValues,
                imagen: e.target.files[0],
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();


        if (!token) {
            console.error("Token is required");
            return;
        }

        const product: IProducts = {
            product_id: '',
            product_name: formValues.name,
            description: formValues.descripcion,
            price: parseFloat(formValues.price),
            image_url: "",
            category: category,
            reviews: [],
            available: formValues.avaliable,
        };

        try {
            const response = await postProduct(token, product);
            console.log(response);
            setFormValues({
                name: '',
                descripcion: '',
                price: '',
                imagen: null,
                avaliable: true
            });
            alert("se agrego el pedido")
        } catch (error: any) {
            console.error(error.message, "este es el error del catch");
            throw new Error("el pedido no pudo procesar")
        }
    };


    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <h2 className="w-full text-xl text-center text-neutral-800 font-extrabold">Add dish</h2>
                <div className="w-4/5 mb-6 relative">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={formValues.name}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="name"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${formValues.name ? 'top-[4px] text-xs' : ''
                            }`}
                    >
                        Name
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <textarea
                        name="descripcion"
                        id="descripcion"
                        placeholder="Description"
                        value={formValues.descripcion}
                        onChange={handleChange}
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                        required
                    />
                    <label
                        htmlFor="descripcion"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${formValues.descripcion ? 'top-[4px] text-xs' : ''
                            }`}
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
                        className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt -4 pb-1"
                        required
                    />
                    <label
                        htmlFor="precio"
                        className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${formValues.price ? 'top-[4px] text-xs' : ''
                            }`}
                    >
                        Price
                    </label>
                </div>
                <div className="w-4/5 mb-6 relative">
                    <label htmlFor="imagen" className="w-full flex flex-col items-center p-4 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                        <span className="text-gray-600">Click to upload an image</span>
                        {formValues.imagen ? (
                            <span className="mt-2 text-gray-700">{formValues.imagen.name}</span>
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