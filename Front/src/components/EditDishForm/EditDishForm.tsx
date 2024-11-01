"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { IProducts, ICategory } from "@/interfaces/productoInterface";
import { editProductImg, putProduct } from "@/Helpers/products.helper";
import Swal from "sweetalert2";
import Image from "next/image";

interface EditDishFormProps {
    selectedProduct: IProducts | null;
    categories: ICategory[];
    token: string | null;
    onClose: () => void;
    onUpdate: () => void;
}

const EditDishForm: React.FC<EditDishFormProps> = ({ selectedProduct, categories, token, onClose, onUpdate }) => {
    const [formValues, setFormValues] = useState({
        product_name: '',
        description: '',
        price: '',
        image_url: '',
        avaliable: true,
        category_id: ''
    });
    const [productImgFile, setProductImgFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (selectedProduct) {
            setFormValues({
                product_name: selectedProduct.product_name,
                description: selectedProduct.description,
                price: selectedProduct.price.toString(),
                image_url: '',
                avaliable: selectedProduct.available,
                category_id: selectedProduct.category.category_id || ''
            });
            setImagePreview(selectedProduct.image_url || '');
        }
    }, [selectedProduct]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
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

        if (!selectedProduct || !selectedProduct.product_id) {
            console.error("Selected editProduct is not valid");
            return;
        }

        try {
            const response = await putProduct(token, selectedProduct.product_id, editProduct);

            if (response.product_id && productImgFile) {
                await editProductImg(productImgFile, token, response.product_id);
            }
            Swal.fire({
                title: 'Product edited successfully',
                icon: 'success',
                timer: 1000,
            });
            onUpdate(); // Actualiza la lista de productos
            onClose(); // Cierra el modal
        } catch {
            console.error("Error al modificar el producto");
        }
    };

    return (
        <div className="w-3/5 bg-neutral-200 p-6 rounded-lg">
            <h2 className="w-full text-xl text-center text-neutral-800 font-extrabold">Edit Dish</h2>
            <form onSubmit={handleSubmit} >
                <div className="flex">
                    <div className="w-1/2 p-4 space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                id="product_name"
                                name="product_name"
                                value={formValues.product_name}
                                onChange={handleChange}
                                className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                                required
                            />
                            <label
                                htmlFor="product_name"
                                className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${formValues.product_name ? 'top-[4px] text-xs' : ''}`}
                            >
                                Name
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                id="price"
                                name="price"
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
                        <div className="relative">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-900">Select a category</label>
                            <select
                                id="category"
                                name="category_id"
                                value={formValues.category_id}
                                onChange={handleChange}
                                className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full"
                            >
                                {categories.map(category => (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="avaliable"
                                name="avaliable"
                                checked={formValues.avaliable}
                                onChange={(e) => setFormValues({ ...formValues, avaliable: e.target.checked })}
                                className="hidden"
                            />
                            <span 
                                className={`w-5 h-5 border rounded-md flex items-center justify-center cursor-pointer ${formValues.avaliable ? 'bg-green-500' : 'bg-red-500'}`}
                                onClick={() => setFormValues({ ...formValues, avaliable: !formValues.avaliable })} // Alterna el estado al hacer clic
                            >
                                <Image src={`${formValues.avaliable ? '/assets/icon/check.png' : '/assets/icon/cross.png'}`} alt="icon" width={10} height={10} />
                            </span>
                            <label 
                                htmlFor="avaliable" 
                                className={`ml-2 ${formValues.avaliable ? 'text-green-500' : 'text-red-500'}`}
                            >
                                {formValues.avaliable ? 'Available' : 'Not Available'}
                            </label>
                        </div>

                    </div>
                    <div className="w-1/2 flex flex-col justify-center relative p-4">
                        <div className="relative">
                            <textarea
                                id="description"
                                name="description"
                                value={formValues.description}
                                onChange={handleChange}
                                className="max-h-36 min-h-16 text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                                required
                            />
                            <label
                                htmlFor="description"
                                className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${formValues.description ? 'top-[4px] text-xs' : ''}`}
                            >
                                Description
                            </label>
                        </div>
                        <div
                            className="flex items-center justify-center border-dashed rounded-md w-1/2 h-32 m-auto mt-2 cursor-pointer relative"
                            onClick={() => document.getElementById('image-input')?.click()}
                        >
                            {imagePreview ? (
                                <div className="w-full h-32 relative">
                                    <Image
                                        src={imagePreview}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="Preview"
                                        className="rounded-md"
                                    />
                                </div>
                            ) : (
                                <span className="text-gray-600">Click or Drag & Drop to upload an image</span>
                            )}
                            <div className="absolute w-full h-full flex items-center justify-center bg-gray-transparent rounded-md">
                                <Image
                                    src="/assets/icon/image.png"
                                    alt="Upload Icon"
                                    width={50}
                                    height={50}
                                    className="object-contain text-white" // Cambia el color a blanco
                                />
                            </div>
                            <input
                                type="file"
                                id="image-input"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <button type="button" onClick={onClose} className="bg-neutral-500 py-1 px-2 rounded-md text-white hover:bg-neutral-600">Cancel</button>
                    <button type="submit" className="bg-secondary py-1 px-2 rounded-md text-white hover:bg-red-700">Save changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditDishForm;
