'use client'
import { IUserSession } from "@/interfaces/productoInterface";
import { editProfile } from "@/lib/server/editProfile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProfileV = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<IUserSession>();
    const [isEditing, setIsEditing] = useState(false);
    
    const [editableData, setEditableData] = useState({
        name: userData?.user?.name || "",
        email: userData?.email || "",
        phone: userData?.user?.phone || "",
        address: userData?.user?.address || "",
    });

    useEffect(() => {
        if(typeof window !== 'undefined' && window.localStorage){
            const userData = JSON.parse(localStorage.getItem("userSession")!)
            setUserData(userData);
        }
    }, [])

    // Maneja cambios en los inputs
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setEditableData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log("edit", editableData);
    };

    // no se manda el user id
    const handleEditData = async (e: any) => {
        console.log("Token:", userData?.token);
        console.log("User ID:", userData?.user?.id);
        console.log("Editable Data:", editableData);
        if (userData?.token && userData?.user?.id) {
            alert(userData?.user?.id)
                const response = await editProfile(editableData, userData?.token, userData?.user.id);
            if (response) {
                setIsEditing(false);
            }
            else {
                alert("Error al editar");
            }
        } else {
            alert("No hay ID o token");
        console.log(userData?.user);
        }
    }
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleSaveClick = () => {
        setIsEditing(false);
    };

    return(
        <div className="bg-white p-6 rounded-lg shadow-lg w-screen max-w-md mx-auto my-48" >

            <div className="w-full flex justify-center items-center">
                <h1 className="text-2xl font-semibold text-center text-gray-800">Account details</h1>
                <div onClick={handleEditClick} className="cursor-pointer ml-2">
                    <Image src="/assets/icon/pencil.png" width={20} height={20} alt="Edit" />
                </div>
            </div>
            {
            userData?.user?.user_img ? (
                <Image src={userData.user.user_img} width={100} height={100} alt="profile" className="m-auto rounded-full"/>
            ) : (
                <Image src="/assets/icon/profileblack.png" width={100} height={100} alt="profile" className="m-auto"/>
            )
}
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
                {isEditing ? (
                    <div className="w-full flex justify-between items-center text-gray-600">
                        <p>Name</p>
                        <input
                            type="text"
                            name="name"
                            value={editableData.name}
                            onChange={handleInputChange}
                            placeholder={`${userData?.user.name}`}
                            className="rounded outline-none border-b min-w-56"
                        />
                    </div>
                ) : (
                    <div className="w-full flex justify-between items-center text-gray-600">
                        <p>Name</p>
                        <p>{userData?.user.name}</p>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
                {isEditing ? (
                    <div className="w-full flex justify-between items-center text-gray-600">
                        <p>Email</p>
                        <input
                            type="email"
                            name="email"
                            value={editableData.email}
                            onChange={handleInputChange}
                            placeholder={`${userData?.email}`}
                            className="rounded outline-none border-b min-w-56"
                        />
                    </div>
                ) : (
                    <div className="w-full flex justify-between items-center text-gray-600">
                        <p>Email</p>
                        <p>{userData?.email}</p>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
                {isEditing ? (
                    <div className="w-full flex justify-between items-center text-gray-600">
                        <p>Phone</p>
                        <input
                            type="text"
                            name="phone"
                            value={editableData.phone}
                            onChange={handleInputChange}
                            placeholder={`${userData?.user.phone}`}
                            className="rounded outline-none border-b min-w-56"
                        />
                    </div>
                ) : (
                    <div className="w-full flex justify-between items-center text-gray-600">
                        <p>Phone</p>
                        <p>{userData?.user.phone}</p>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
                {isEditing ? (
                    <div className="w-full flex justify-between items-center text-gray-600">
                        <p>Address</p>
                        <input
                            type="address"
                            name="address"
                            value={editableData.address}
                            onChange={handleInputChange}
                            placeholder={`${userData?.user.address}`}
                            className="rounded outline-none border-b min-w-56"
                        />
                    </div>
                ) : (
                    <div className="w-full flex justify-between items-center text-gray-600">
                        <p>Address</p>
                        <p>{userData?.user.address}</p>
                    </div>
                )}
            </div>
            {
                isEditing ? (
                <div className="w-full flex justify-end">
                    <button onClick={handleEditData} className="w-auto px-3 py-1 bg-secondary rounded-lg mt-3">Save</button>
                </div> ) : ("")
            }
        </div>
    )
}
export default ProfileV;