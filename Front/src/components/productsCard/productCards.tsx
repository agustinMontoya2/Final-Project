"use client"
import { IProducts } from "@/interfaces/productoInterface";
import { useRouter } from "next/navigation";
import React, { useState } from 'react'

const ProductCardsview: React.FC<IProducts> = ({ product_id, price, description, image_url, name }) => {
  const [userMessage, setUserMessage] = useState<string>(" ")
  const router = useRouter();

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center p-2 w-1/4 bg-third rounded-lg">

        <div className="mb-4 ">
          <img
            src={image_url}
            alt=""
            className="w-40% h-auto rounded-lg"
          />
        </div>
        <div className="text-center">
          <h2 className="text-gray-900 text-xl font-bold mb-2">{name}</h2>
          <p className="text-gray-900 mb-2">{description}</p>
          <p className="text-gray-900 text-lg font-semibold mb-4">{price}</p>
        </div>
        <div>
          <input
            type="text"
            value={userMessage}
            onChange={handleMessageChange}
            placeholder="Sin tomate..."
            className="border text-black border-gray-300 rounded px-2 py-1 mb-4 w-full"
          />
        </div>
        <div>
          <button className="bg-secondary text-black px-4 py-2 rounded hover:bg-secondary-dark">
            Add to Cart
          </button>
        </div>
      </div>
    </div>

  )

}

export default ProductCardsview;
