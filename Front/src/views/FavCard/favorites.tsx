'use client';
import { getFavorities, addFavorities, removeFavorities } from '@/Helpers/favorities';
import { useRouter } from "next/navigation";
import { IFavorities, IProducts, IUserSession } from "@/interfaces/productoInterface";
import React, { useEffect, useState } from 'react';
import { addCart } from "@/Helpers/cart";
import Swal from 'sweetalert2';
import Image from 'next/image';

const FavoritesView: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserSession>();
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<IFavorities | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined"){
      const storeUserData = window.localStorage.getItem("userSession");
      if(storeUserData){
          const parseData = JSON.parse(storeUserData)
          if(parseData && parseData.user)
              setUserId(parseData.user.user_id);
          setToken(parseData.token)
        fetchData();
      }
    }
  }, [userData]);

  const fetchData = async () => {
    if (token && userId) {
      try {
        const reservasData = await getFavorities(userId, token);
        if (reservasData && reservasData.product) {
          setFavorites(reservasData);
        } else {
          console.warn("No products found in favorites data");
        }
      } catch (error) {
        console.error("Error al obtener favoritos", error);
      }
    }
  };

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (!userSession) {
      router.push('/login');
    } else {
      setUserData(JSON.parse(userSession));
    }
  }, [router]);

  const handleAddToFavorities = async (productId: string, isFavorited: boolean) => {
    if (token && userId) {
      try {
        if (isFavorited) {
          await removeFavorities(userId, productId, token);
        } else {
          await addFavorities(userId, productId, token);
        }
        fetchData();
      } catch {
        console.error("Error al manejar favoritos");
      }
    } else {
      Swal.fire({
        title: 'Sign in to manage favorites.',
        icon: 'info',
        confirmButtonText: 'accept',
        confirmButtonColor: "#1988f0"
      })
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
        alert(`Error: ${error instanceof Error ? error.message : error}`);
      }
    } else {
      Swal.fire({
        title: 'Sign in to add to cart.',
        icon: 'info',
        confirmButtonText: 'accept',
        confirmButtonColor: "#1988f0"
      })
    }
  };


  return (
    <div className=" min-h-screen py-10 my-24">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-black mb-8 text-gradient">My Favorites</h1>
        {favorites && favorites.product && favorites.product.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.product.map((product: IProducts) => (
              <div key={product.product_id} className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105">
                <Image src={product.image_url} alt={product.product_name} width={300} height={300} className="w-full h-56 object-cover rounded-t-lg mb-4" />
                <div className="flex flex-col justify-between h-72 p-4">
                  <div className='h-auto'>
                    <h2 className="text-xl text-black font-semibold">{product.product_name}</h2>
                    <p className="text-gray-700 font-medium">
                      Price: <span className="text-black">${product.price}</span>
                    </p>
                    <p className="text-gray-500">{product.description}</p>
                  </div>
                  <div className="w-full h-auto flex justify-between">
                    <button
                      onClick={() => handleAddToFavorities(product.product_id, favorites.product.some(fav => fav.product_id === product.product_id))}
                      className="mt-4  bg-secondary text-white font-bold px-2 p-3 rounded-lg hover:bg-red-700 transition duration-300">
                      {favorites.product.some(fav => fav.product_id === product.product_id) ? "Remove " : "Add to Favorites"}
                    </button>
                    <button
                      onClick={() => handleAddCart(product.product_id)}
                      className="mt-4 bg-green-600 text-white font-bold px-6 rounded-lg hover:bg-green-700 transition duration-300">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 text-lg">You do not have any favorites.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesView;
