'use client'
import { IUserSession } from "@/interfaces/productoInterface";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProfileV = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<IUserSession>();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const userData = JSON.parse(localStorage.getItem("userSession")!)
            setUserData(userData);
        }
    }, [])

    const handleClick = () => {
        localStorage.removeItem("userSession")

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseenter = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: 'success',
            title: 'Logout successfully'
        });
    router.push("/menu")
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-screen max-w-md mx-auto my-48" >
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Account details</h1>

            <div className="flex justify-between items-center py-4 border-b border-t border-gray-200">
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