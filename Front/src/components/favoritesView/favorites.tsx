'use client';
import { getFavorities, addFavorities, removeFavorities } from '@/lib/server/favorities';
import { useRouter } from "next/navigation";
import { IFavorities, IProducts, IUserSession } from "@/interfaces/productoInterface";
import React, { useEffect, useState } from 'react';
import { addCart } from "@/lib/server/cart";
import Image from 'next/image'; // Asegúrate de importar Image para usarlo
import Swal from 'sweetalert2';

const FavoritesView: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserSession>();
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<IFavorities | null>(null);
  
  useEffect(() => {
    const storedUserData = window.localStorage.getItem("userSession");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      if (parsedData && parsedData.user) {
        setUserId(parsedData.user.user_id);
        setToken(parsedData.token);
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
        fetchData(); // Actualiza la lista de favoritos después de agregar o eliminar
      } catch (error) {
        console.error("Error al manejar favoritos", error.message);
      }
    } else {
      alert("Inicia sesión para manejar favoritos.");
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
      alert("Inicia sesión para agregar al carrito.");
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-black mb-8 text-gradient">My Favorites</h1>
        {favorites && favorites.product && favorites.product.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.product.map((product: IProducts) => (
              <div key={product.product_id} className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105">
                <img src={product.image_url} alt={product.product_name} className="w-full h-56 object-cover rounded-t-lg mb-4" />
                <div className="p-4">
                  <h2 className="text-xl text-black font-semibold mb-2">{product.product_name}</h2>
                  <p className="text-gray-700 font-medium">
                    Price: <span className="text-black">${product.price}</span>
                  </p>
                  <p className="text-gray-500">{product.description}</p>

                  <div className="flex justify-between m-4">
                    <div className='px-3'>
                    <button 
                      onClick={() => handleAddToFavorities(product.product_id, favorites.product.some(fav => fav.product_id === product.product_id))} 
                      className="mt-4  bg-red-200 text-black font-bold px-2 p-3 rounded-lg hover:bg-red-700 transition duration-300">
                      {favorites.product.some(fav => fav.product_id === product.product_id) ? "Remove " : "Add to Favorites"}
                    </button>
                    </div>

                    <div className='px-3'>
                    <button 
                      onClick={() => handleAddCart(product.product_id)} 
                      className="mt-4 bg-red-200 text-black font-bold px-6 rounded-lg hover:bg-red-700 transition duration-300">Add to Cart</button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 text-lg">You don't have any favorites.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesView;
