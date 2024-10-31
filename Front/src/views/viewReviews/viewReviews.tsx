'use client'
import { getReviews, removeReviews } from '@/Helpers/reviews';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { IReview } from '@/interfaces/productoInterface';
import Swal from 'sweetalert2';
import '../../styles/scrollbar.css'

const ViewReviews = () => {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);


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
    if (token && userId) {
    handleGetReviews();
    }
}, [token, userId]);

    const handleGetReviews =  async ()=>{

        if (token && userId) {
        try {
            const reviewsData = await getReviews(token);
            console.log(reviewsData);
            
            if (reviewsData) {
                setReviews(reviewsData); 
            } else {
            console.warn("No reviews found.");
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
        }
    };
    const handleDeleteReview = async (review_id: string)=> {
        if (token && userId) {
        try {
            const deleteReview = await removeReviews(review_id, token);
            Swal.fire({
                icon: 'error',
                title: `${deleteReview.message}`,
                toast: true,
                position: 'top-end',
                timer: 2500,
                showConfirmButton: false,
                timerProgressBar: true,
            });
        handleGetReviews()
        } catch (error) {
            alert(error)
        }
    }

    }


    return (
        <div className="w-4/5 m-auto">
            <h2 className="text-3xl font-bold text-center text-black-700 mb-6">Reviews</h2>
            {reviews.length > 0 ? (
                <div className='h-screen overflow-y-scroll scrollbar-custom'>
                    <ul className="space-y-6">
                        {reviews.map((review) => (
                            <li key={review.review_id} className="p-5 border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                            <p className='text-lg text-gray-800'>Description: {review.review}</p>
                            <p className='text-gray-600 mt-2'>
                                Rating:
                                <span className='font-bold text-yellow-500 ml-1'>{review.rate} ★</span>
                            </p>
                            <p className='text-gray-600 mt-2'>Product: <span className='font-semibold text-black-700'>{review.product.product_name}</span></p>
                            <div className='w-full h-10 flex justify-between items-center flex-row'>
                                <p className='text-gray-500'>By: <span className='font-semibold text-black-700'>{review.user.name}</span></p>
                                <button
                                    onClick={() => handleDeleteReview(review.review_id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete Review
                                </button>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className='text-lg text-center text-gray-700'>No reviews found.</p>
            )}
        </div>


    )
}

export default ViewReviews;