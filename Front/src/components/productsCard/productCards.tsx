"use client";
import { IProducts, ICart, IFavorities } from "@/interfaces/productoInterface";
import { getProductsDB } from "@/Helpers/products.helper";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { addCart } from "@/lib/server/cart";
import { addFavorities, getFavorities, removeFavorities } from "@/lib/server/favorities"; 
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ProductCards: React.FC<IProducts> = ({ product_id, price, description, image_url, product_name }) => {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [favorities, setFavorities] = useState<IFavorities>();
  
  useEffect(() => {
    const storedUserData = window.localStorage.getItem("userSession");
    if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        if (parsedData && parsedData.user) {
            setUserId(parsedData.user.user_id);
            setToken(parsedData.token);
            fetchFavorities();
        }
    }
}, []);

useEffect(() => {
    if (userId && token) {
        fetchFavorities();
    }
}, [userId, token]);

const fetchFavorities = async () => {
    if (token && userId) {
        try {
            const favoritiesData = await getFavorities(userId, token);
            setFavorities(favoritiesData);
        } catch (error) {
            console.error("Fail to obtain favorites.");
        }
    } else {
        console.log("There is no token.");
    }
};

const handleAddToFavorities = async (productId: string, isFavorited: boolean) => {
    if (token && userId) {
        try {
            if (isFavorited) {
                await removeFavorities(userId, productId, token);
                await fetchFavorities();
                
            } else {
                await addFavorities(userId, productId, token);
                await fetchFavorities();
            }
        } catch (error) {
            console.error("Fail to save favorite.", );
        }
    } else {
        alert("Log in to save as favorite.");
        router.push("/login");
    }
};

const handleAddCart = async (productId: string) => {
    if (token && userId) {
        try {
            await addCart(userId, productId, token);
            Swal.fire({
              icon: 'success',
              title: 'Product added to the cart',
              toast: true,
              position: 'top-end',
              timer: 2500,
              showConfirmButton: false,
              timerProgressBar: true,
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false,
            timerProgressBar: true,
        });
        }
    } else {
        alert("Inicia sesión para agregar al carrito.");
    }
};

return (
  <div className="w-[70%] flex flex-col items-center p-4 bg-white rounded-lg m-[40%] shadow-md transition-transform duration-200 ease-in-out transform hover:scale-105 relative">
    <button
      className="absolute top-2 right-2 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        handleAddToFavorities(product_id, favorities?.product.some(favoriteProduct => favoriteProduct.product_id === product_id) ?? false);
      }}
    >
      <Image
        src={favorities?.product.some(favoriteProduct => favoriteProduct.product_id === product_id)
          ? "/assets/icon/star.png"
          : "/assets/icon/staroutline.png"}
        alt="Favorite icon"
        width={24}
        height={24}
      />
    </button>
    
    <div className="w-full flex justify-center">
      <div className="relative w-72 h-56">
        <Image
          src={image_url}
          alt={product_name}
          layout="fill"
          objectFit="contain"
          className="w-full h-auto rounded-md shadow-md"
        />
      </div>
    </div>
    <div className="w-full text-center mt-2">
      <h2 className="text-gray-900 text-xl font-bold mb-1">{product_name}</h2>
      <p className="text-gray-700 mb-2 text-sm">{description}</p>
      <p className="text-gray-900 text-lg font-semibold mb-4">${price}</p>
    </div>
    <div>
      <button
        onClick={() => handleAddCart(product_id)}
        className="bg-secondary text-white font-semibold px-4 py-2 rounded hover:bg-red-700"
      >
        <Image src="/assets/icon/cart.png" width={20} height={20} alt="Add to Cart" className="inline mr-1" />
        Add to Cart
      </button>
    </div>
  </div>
);

};

export default ProductCards;
