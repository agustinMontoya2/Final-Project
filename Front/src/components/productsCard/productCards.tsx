"use client";
import { IProducts, ICart, IFavorities, IReview, } from "@/interfaces/productoInterface";
import { getProduct, getProductsDB, postReview } from "@/Helpers/products.helper";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { addCart } from "@/lib/server/cart";
import { addFavorities, getFavorities, removeFavorities } from "@/lib/server/favorities";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

const ProductCards: React.FC<IProducts> = ({ product_id, price, description, image_url, product_name, reviews = [] }) => {
  // const { category_name } = category; 

  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [favorities, setFavorities] = useState<IFavorities>();
  const [productState, setProductState] = useState<IProducts>({
    product_id,
    product_name,
    price,
    description,
    image_url,
    category: {
      category_name: 'some_category'
    },
    reviews, 
    available: true 
  })
  const [reviewPost, setReviewPost] = useState<{ rate: number; review: string }>({ rate: 0, review: '' });
  // const [review, setReviews] = useState<IReview>();

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
        const product = await getProduct(product_id)
        setProductState(product)
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
        console.error("Fail to save favorite.",);
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



  const handleInputReview = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setReviewPost((prev) => ({
      ...prev,
      [name]: name === "rate" ? Number(value) : value
    }));
  };

  const handlePostReview = async () => {
    if (!userId || !token) {
      alert("Please log in to enter a review.");
      router.push("/login")
      return;
    }

    try {
      const response = await postReview(userId, token, product_id, reviewPost)
      const product = await getProduct(product_id)
      alert("post review made")
      setProductState(product)

      setReviewPost({ rate: 0, review: '' });
    } catch (error) {
      console.error(error);
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
        <div>
          <ul>
            {productState.reviews.map((rev) => (
              <li key={rev.review_id}>
                <p className="text-black">{rev.review}</p>
                <p className="text-black">Rating: {rev.rate}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-900 text-lg font-semibold mb-4">${price}</p>
      </div>


      <input
        type="number"
        name="rate"
        value={reviewPost.rate}
        onChange={handleInputReview}
        placeholder={"Value between 1 and 5"}
        className="rounded outline-none border-b border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 min-w-56 mb-2 p-2"
      />

      <textarea
        name="review"
        value={reviewPost.review}
        onChange={handleInputReview}
        placeholder="Escribe tu review"
        className="rounded outline-none border-b border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 min-w-56 mb-2 p-2"
      />

      <button
        onClick={handlePostReview}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Post review
      </button>

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
