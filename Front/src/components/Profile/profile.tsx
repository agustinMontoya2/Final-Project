'use client'
import { IUserSession } from "@/interfaces/productoInterface";
import React, { useEffect, useState } from "react";

const ProfileV = () => {
    const [userData, setUserData] = useState<IUserSession>();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const userData = JSON.parse(localStorage.getItem("userSession")!)
            setUserData(userData);
        }
    }, [])


    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-screen max-w-md mx-auto my-48" >
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Account details</h1>

            <div className="flex justify-between items-center py-4 border-b border-gray-200">


                <div className="text-gray-800">
                    {userData?.user?.user_img ? (
                        <img className="" src={userData.user.user_img} alt="profile picture" />
                    ) : (
                        <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="default picture" className="" />
                    )}
                </div>

            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <div className="font-medium text-gray-600">
                    <p>Name</p>
                </div>
                <div className="text-gray-800">
                    <p>{userData?.user?.name}</p>
                </div>
            </div>

            <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <div className="font-medium text-gray-600">
                    Email
                </div>
                <div className="text-gray-800">
                    <p>{userData?.email}</p>
                </div>
            </div>

            <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <div className="font-medium text-gray-600">
                    Phone
                </div>
                <div className="text-gray-800">
                    <p>{userData?.user?.phone}</p>
                </div>
            </div>

            <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <div className="font-medium text-gray-600">
                    Address
                </div>
                <div className="text-gray-800">
                    <p>{userData?.user?.address}</p>
                </div>
            </div>

        </div>
    )
}
export default ProfileV;