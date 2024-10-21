"use client"
import { IProducts, ICart } from "@/interfaces/productoInterface";
import Image from "next/image";
import React, { useState } from 'react'
import { useEffect } from "react";
import { addCart } from "@/lib/server/cart";

const ProductCardsview: React.FC<IProducts> = ({product_id, price, description, image_url, product_name }) => {
  const [userMessage, setUserMessage] = useState<string>(" ")
 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cart, setCart] = useState<ICart>(); 


  useEffect(() => {
    const storedUserData = window.localStorage.getItem("userSession");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      if (parsedData && parsedData.user) {
          setUserId(parsedData.user.user_id);
          setToken(parsedData.token);
      }
  }
}, []);


const handleAddCart = async (productId: string) => {
  if (token && userId) {
      try {
          await addCart(userId, productId, token);
          alert("Product added to cart");
      } catch (error) {
          alert(`Error: ${error instanceof Error ? error.message : error}`);
          console.error("Error al agregar al carrito");
      }
  } else {
      alert("Inicia sesión para agregar al carrito.");
  }
};
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(event.target.value);
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="flex flex-col items-center p-2 w-1/4 bg-third rounded-lg">
        <div className="mb-4 ">
          <div className="relative w-64 h-64">
            <Image
                src={image_url}
                alt={product_name}
                layout="fill"
                objectFit="contain"
                className="w-full h-auto"
            />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-gray-900 text-xl font-bold mb-2">{product_name}</h2>
          <p className="text-gray-900 mb-2">{description}</p>
          <p className="text-gray-900 text-lg font-semibold mb-4">{price}</p>
        </div>
        <div>
          <button
          onClick={() => handleAddCart(product_id)} 
          className="bg-secondary text-white font-semibold px-4 py-2 rounded hover:bg-red-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>

  )

}

export default ProductCardsview;