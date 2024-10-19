"use client"
import { IProducts } from "@/interfaces/productoInterface";
import Image from "next/image";
import React, { useState } from 'react'
import ProductQuantity from "../ProductQuantity/ProductQuantity";

const ProductCards: React.FC<IProducts> = ({ price, description, image_url, product_name }) => {
  // const [userMessage, setUserMessage] = useState<string>()

  // const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setUserMessage(event.target.value);
  // };

  return (
      <div className="w-1/4 flex flex-col items-center p-2 bg-third rounded-lg m-auto">
        <div className="w-full flex justify-center">
          <div className="relative w-72 h-56">
            <Image
                src={image_url}
                alt={product_name}
                layout="fill"
                objectFit="contain"
                className="w-full h-auto"
            />
          </div>
        </div>
        <div className="w-full text-center">
          <h2 className="text-gray-900 text-xl font-bold mb-2">{product_name}</h2>
          <p className="text-gray-900 mb-2">{description}</p>
          <p className="text-gray-900 text-lg font-semibold mb-4">${price}</p>
        </div>
        <div className="w-72 flex justify-between">
          <ProductQuantity />
          <button className=" bg-secondary text-white font-semibold px-4 py-2 rounded hover:bg-red-700">
            Add to Cart
          </button>
        </div>
      </div>
  )
}

export default ProductCards;
