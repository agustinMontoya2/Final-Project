'use client'
import { getReviews, removeReviews } from '@/Helpers/reviews';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { IReview } from '@/interfaces/productoInterface';
import Swal from 'sweetalert2';
import '../../styles/scrollbar.css'
import Image from 'next/image';

const ViewReviews = () => {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');


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
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            // Si el usuario confirma, proceder con la eliminación
            if (result.isConfirmed) {
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
        handleGetReviews()}
        } catch (error) {
            alert(error)
        }
    }

    }

const filteredReviews = reviews.filter(review =>
    review.product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
)


return (
    <div className="w-4/5 m-auto">
        <h2 className="text-3xl font-bold text-center text-black-700 mb-6 text-neutral-800 mt-10">Reviews</h2>
        <div className="w-full md:w-1/3 m-auto mb-4 flex items-center border rounded-xl bg-white">
            <Image
                src="/assets/icon/search.png"
                alt="Search"
                width={20}
                height={20}
                className="ml-2"
            />
            <input
                type="text"
                placeholder="Search dish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-none rounded-lg outline-none px-2 py-2 text-gray-700 w-full"
            />
        </div>
        {filteredReviews.length > 0 ? (
            <div className='h-screen overflow-y-scroll scrollbar-custom'>
                <ul className="space-y-6">
                    {filteredReviews.map((review) => (
                        <li key={review.review_id} className="md:w-2/3 m-auto p-5 border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300 mb-4">
                            <div className=' flex justify-between items-start mb-4'>
                                <div className='w-4/5'>
                                    <p className='text-black font-semibold mt-2'>Product: <span className='text-gray-700 font-sans'>{review.product.product_name}</span></p>
                                    <p className='text-black font-semibold'>By: <span className='text-gray-700 font-sans'>{review.user.name}</span></p>
                                    <p className='text-black font-semibold mt-2'>
                                        Rating: <span className='font-bold text-yellow-500 ml-1'>{review.rate} ★</span>
                                    </p>
                                    <p className='text-black font-semibold'>Review: <span className='text-gray-700 font-sans'>{review.review}</span></p>
                                </div>
                                <div className='ml-4'>
                                    <button
                                        onClick={() => handleDeleteReview(review.review_id)}
                                        className="px-4 py-2 text-white rounded"
                                    >
                                        <Image src={'/assets/icon/trashred.png'} width={30} height={30} alt='trash'/>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <p className='text-lg text-center text-gray-700'>No reviews found.</p>
        )}
    </div>
);
}

export default ViewReviews;