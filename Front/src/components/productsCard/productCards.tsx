"use client"
import { IProducts } from "@/interfaces/productoInterface";
import { useRouter } from "next/navigation";
import React from 'react'

const ProductCardsview:React.FC<IProducts> = ({product_id, price, description, image_url, name}) => {
    const router = useRouter();
  return (
    <div>
    <div>
      <img src={image_url} alt="" />
    </div>
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{price}</p> 
    </div>
    <div> 
        <button>
            
        </button>
    </div>
    </div>
  )

}

export default ProductCardsview;
