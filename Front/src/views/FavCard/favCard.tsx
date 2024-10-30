"use client"
import { IProducts } from '@/interfaces/productoInterface'
import Image from 'next/image'
import React from 'react'

const FavCard: React.FC<{ favorite: IProducts | { product: IProducts } }> = ({ favorite }) => {
    if (!favorite) {
        return null;
    }

    const product: IProducts = 'product' in favorite ? favorite.product : favorite;

    const { price, description, image_url, product_name } = product;

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative w-64 h-64">
                <Image
                    src={image_url}
                    alt={product_name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                    />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product_name}</h3>
                <p className="text-sm text-gray-600 mb-2">{description}</p>
                <p className="text-lg font-bold text-blue-600">${price}</p>
            </div>
        </div>
    );
}

export default FavCard