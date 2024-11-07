"use client";
import { IProducts, IFavorities } from "@/interfaces/productoInterface";
import { getProduct, postReview } from "@/Helpers/products.helper";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { addCart } from "@/Helpers/cart";
import { addFavorities, getFavorities, removeFavorities } from "@/Helpers/favorities";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ProductCards: React.FC<IProducts> = ({ product_id, price, description, image_url, product_name, reviews = [] }) => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [favorities, setFavorities] = useState<IFavorities>();
  const [productState, setProductState] = useState<IProducts>({ product_id, product_name, price, description, image_url, category: { category_name: 'some_category', category_id: "some_id" }, reviews, available: true });
  const [reviewPost, setReviewPost] = useState<{ rate: number; review: string }>({ rate: 0, review: '' });
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);



  useEffect(() => {
    if (typeof window !== "undefined") {
      const storeUserData = window.localStorage.getItem("userSession");
      if (storeUserData) {
        const parseData = JSON.parse(storeUserData)
        if (parseData && parseData.user)
          setUserId(parseData.user.user_id);
        setToken(parseData.token)
        // const storedUserData = JSON.parse(window.localStorage.getItem("userSession") || "{}");
        // if (storedUserData.user) {
        //   setUserId(storedUserData.user.user_id);
        //   setToken(storedUserData.token);
      }
    }
  }, []);

  useEffect(() => {
    if (userId && token) fetchFavorities();
  }, [userId, token]);

  const hasPurchasedProduct = () => {
    if (typeof window !== "undefined") {
      const purchasedProductIds = JSON.parse(localStorage.getItem("purchasedProductIds") || "[]");
      console.log("Productos comprados:", purchasedProductIds);
      return purchasedProductIds.includes(product_id);
    }
    return false;
  };

  const fetchFavorities = async () => {
    if (token && userId) {
      try {
        const favoritiesData = await getFavorities(userId, token);
        setFavorities(favoritiesData);
        const product = await getProduct(product_id);
        setProductState(product);
      } catch {
        console.error("Fail to obtain favorites.");
      }
    }
  };

  const handleAddToFavorities = async (productId: string, isFavorited: boolean) => {
    if (!token || !userId) return Swal.fire({
      title: `Log in to save as favorite.`,
      icon: 'info',
      confirmButtonText: 'accept',
      confirmButtonColor: "#1988f0"
    })
    try {
      // Manejo de favoritos con if-else
      if (isFavorited) {
        await removeFavorities(userId, productId, token);
      } else {
        await addFavorities(userId, productId, token);
      }

      await fetchFavorities();
    } catch {
      console.error("Fail to save favorite.");
    }
  };

  const handleAddCart = async (productId: string) => {
    if (!token || !userId) return Swal.fire({
      title: `Sign in to add to cart.`,
      icon: 'info',
      confirmButtonText: 'accept',
      confirmButtonColor: "#1988f0"
    })
    try {
      await addCart(userId, productId, token);
      Swal.fire({ icon: 'success', title: 'Product added to the cart', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
      handlePurchase(productId);
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', toast: true, position: 'top-end', timer: 2500, showConfirmButton: false });
    }
  };


  const saveProductToLocalStorage = (productId: string) => {
    if (typeof window !== "undefined") {
      const purchasedProducts = JSON.parse(localStorage.getItem("purchasedProducts") || "[]");
      if (!purchasedProducts.includes(productId)) {
        purchasedProducts.push(productId);
        localStorage.setItem("purchasedProducts", JSON.stringify(purchasedProducts));
      }
    }
  };

  const handleInputReview = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewPost(prev => ({ ...prev, review: event.target.value }));
  };

  const handlePostReview = async () => {
    if (!userId || !token) {
      Swal.fire({
        title: `Please log in to enter a review.`,
        icon: 'info',
        confirmButtonText: 'accept',
        confirmButtonColor: "#1988f0"
      })
      router.push("/login");
      return;
    } else if (!hasPurchasedProduct()) {
      Swal.fire({
        title: "You can only review products you have purchased.",
        icon: "info",
        confirmButtonText: "Accept",
        confirmButtonColor: "#1988f0",
      });
      return;
    }





    if (reviewPost.rate === 0) {
      Swal.fire({
        title: `Please select a rating before submitting.`,
        icon: 'info',
        confirmButtonText: 'accept',
        confirmButtonColor: "#1988f0"
      })
      return;
    }


    try {
      await postReview(userId, token, product_id, reviewPost);
      const product = await getProduct(product_id);
      Swal.fire({
        icon: 'success',
        title: 'Post review made.',
        toast: true,
        position: 'top-end',
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      setProductState(product);
      setReviewPost({ rate: 0, review: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePurchase = (productId: string) => {
    saveProductToLocalStorage(productId);
  };

  const handleStarClick = (selectedRate: number) => setReviewPost(prev => ({ ...prev, rate: selectedRate }));

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => adjustHeight(), [reviewPost.review]);

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="w-[25%] h-auto flex flex-col items-center p-4 bg-white rounded-lg shadow-xl duration-500 hover:scale-105 relative ">
        <button className="absolute top-2 right-2" onClick={(e) => { e.stopPropagation(); handleAddToFavorities(product_id, favorities?.product.some(favoriteProduct => favoriteProduct.product_id === product_id) ?? false); }}>
          <Image src={favorities?.product.some(favoriteProduct => favoriteProduct.product_id === product_id) ? "/assets/icon/star.png" : "/assets/icon/staroutline.png"} alt="Favorite icon" width={24} height={24} />
        </button>
        <div className=" flex justify-center relative w-72 h-56">
          <Image src={image_url} alt={product_name} layout="fill" objectFit="contain" className="w-full h-auto rounded-md" />
        </div>
        <div className="w-full text-center mt-2">
          <h2 className="text-gray-900 text-xl font-bold mb-1">{product_name}</h2>
          <p className="text-gray-700 mb-2 text-sm">{description}</p>
          <p className="text-gray-900 text-lg font-semibold mb-4">${price}</p>
        </div>
        <button onClick={() => handleAddCart(product_id)} className="bg-secondary text-white font-semibold px-4 py-2 rounded hover:bg-red-700">
          <Image src="/assets/icon/cart.png" width={20} height={20} alt="Add to Cart" className="inline mr-1" />Add to Cart
        </button>
      </div>
      <div className="w-1/3 h-auto flex justify-center">
        <div className="w-full flex flex-col">
          <h2 className="text-black m-auto font-bold py-3 text-xl">What did you think of our dishes?</h2>
          <div className="w-full flex mb-2">
            <div className="w-full">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(null)} onClick={() => handleStarClick(star)} className="focus:outline-none">
                  <Image src={star <= (hoverRating ?? reviewPost.rate) ? "/assets/icon/star.png" : "/assets/icon/staroutline.png"} alt={`Star ${star}`} width={24} height={24} />
                </button>
              ))}
              <textarea
                ref={textAreaRef}
                name="review"
                value={reviewPost.review}
                onChange={(e) => { handleInputReview(e); adjustHeight(); }}
                placeholder="Write your review..."
                className="w-full min-h-10 rounded outline-none bg-transparent border-neutral-400 border-b focus:border-b-blue-700 mb-2 p-2 text-neutral-500 resize-none"
              />
            </div>
            <button onClick={handlePostReview} className="h-19 p-1 my-auto bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
              <Image src="/assets/icon/send.png" width={30} height={30} alt="send" />
            </button>
          </div>
          <div className="">
            <h2 className="text-black font-bold py-3 text-lg border-neutral-800 border-t w-full">Reviews of people</h2>
            <ul>
              {productState.reviews.map((rev) => (
                <li key={rev.review_id} className="items-center mb-2">
                  <div className="flex border-neutral-400 border-t py-2">
                    <div className="relative w-12 h-12 overflow-hidden mr-3 flex justify-center items-center rounded-full">
                      <Image
                        src={rev.user.user_img || "/assets/icon/profileblack.png"}
                        layout="fill"
                        objectFit="cover"
                        alt="User image"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <div className="flex">
                        <p className="text-neutral-900 font-semibold">{rev.user.name}</p>
                        <div className="flex ml-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Image key={star} src={star <= rev.rate ? "/assets/icon/star.png" : "/assets/icon/staroutline.png"} alt={`Star ${star}`} width={24} height={24} />
                          ))}
                        </div>
                      </div>
                      <p className="text-black">{rev.review}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
