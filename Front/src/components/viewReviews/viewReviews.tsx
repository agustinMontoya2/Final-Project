'use client'
import { getReviews, removeReviews } from '@/lib/server/reviews';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { IReview } from '@/interfaces/productoInterface';
import Swal from 'sweetalert2';
const ViewReviews = () => {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);

useEffect(() => {
    const storedUserData = window.localStorage.getItem("userSession");
    if (storedUserData) {
    const parsedData = JSON.parse(storedUserData);
    if (parsedData && parsedData.user) {
        setUserId(parsedData.user.user_id);
        setToken(parsedData.token);
    }
    }
}, [userData]);

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
        <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-lg">
    {reviews.length > 0 ? (
        <div>
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Reviews</h2>
            <ul className="space-y-6">
                {reviews.map((review) => (
                    <li key={review.review_id} className="p-5 border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                    <p className='text-lg text-gray-800'>{review.review}</p>
                    <p className='text-gray-600 mt-2'>
                        Rating: 
                        <span className='font-bold text-yellow-500 ml-1'>{review.rate} ★</span>
                    </p>
                    <p className='text-gray-500'>By: <span className='font-semibold text-blue-600'>{review.user.name}</span></p>
                    <p className='text-gray-600 mt-2'>Product: <span className='font-semibold text-blue-600'>{review.product.product_name}</span></p>
                
                    {/* Botón para eliminar reseña */}
                    <button
                        onClick={() => handleDeleteReview(review.review_id)}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        Delete Review
                    </button>
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