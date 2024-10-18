"use client"
import { IProducts } from "@/interfaces/productoInterface";
import Image from "next/image";
import React, { useState } from 'react'

const ProductCardsview: React.FC<IProducts> = ({ price, description, image_url, product_name }) => {
  const [userMessage, setUserMessage] = useState<string>(" ")


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
          <textarea
            type="text"
            value={userMessage}
            onChange={handleMessageChange}
            placeholder="Aclarcaciones..."
            className="border text-black border-gray-300 rounded px-2 py-1 mb-4 w-full"
          />
        </div>
        <div>
          <button className="bg-secondary text-white font-semibold px-4 py-2 rounded hover:bg-red-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>

  )

}

export default ProductCardsview;