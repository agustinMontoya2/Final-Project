
'use client';
import { IUser, IUserSession } from "@/interfaces/productoInterface";
import { editProfile, editProfileImg, getUser } from "@/lib/server/editProfile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProfileV = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<IUserSession>();
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState<IUser>();
    const [profileImgFile, setProfileImgFile] = useState<File | null>(null);
    const [imagenPreview, setImagePreview]  = useState<string | null>(null);
    const [profileImg,  setProfileImg] = useState<string | null>(null);

    const [originalProfileImg, setOriginalProfileImg] = useState<string | null>(null);


    const [editableData, setEditableData] = useState({
        name: userData?.user?.name || "",
        email: userData?.email || "",
        phone: userData?.user?.phone || "",
        address: userData?.user?.address || "",
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const userData = JSON.parse(localStorage.getItem("userSession")!)
            setUserData(userData);
            const img = localStorage.getItem('profileImg');
            console.log(img);
            
            setProfileImg(img);
        }
    }, []);

    useEffect(() => {
        if (userData?.token && userData?.user?.user_id) {
            handleGetUser();
        }
    }, [userData]);

    useEffect(() => {
        if (user) {
            const img = user.user_img || "/assets/icon/profileblack.png";
            localStorage.setItem('profileImg', img);
        }
    }, [user]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setEditableData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        if (userData?.token && userData?.user?.user_id) {
            try {
                if (profileImgFile) {
                    await editProfileImg(profileImgFile, userData.token, userData.user.user_id);
                    const newImgUrl = URL.createObjectURL(profileImgFile);
                    // Actualiza la imagen en userSession
                    userData.user.user_img = newImgUrl; // Suponiendo que user_img es el campo correcto
                    localStorage.setItem("userSession", JSON.stringify(userData));
                    window.dispatchEvent(new Event("userSessionUpdated"));
                }
                const response = await editProfile(editableData, userData.token, userData.user.user_id);
                Swal.fire({
                    icon: 'success',
                    title: 'User updated successfully',
                    toast: true,
                    position: 'top-end',
                    timer: 2500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
                handleGetUser();
                setIsEditing(false);
            } catch (error: any) {
                alert(error.message);
            }
        } else {
            Swal.fire({
                title: 'Log in first',
                icon: 'info',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
        }
    };
    

    const handleEditImageData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImgFile(file);
            const imgUrl = URL.createObjectURL(file);
            setImagePreview(imgUrl);
        }
    };

    const handleGetUser = async () => {
        if (userData?.token) {
            try {
                const response = await getUser(userData?.user?.user_id, userData?.token);
                setUser(response);
                setEditableData(response);
                // setOriginalProfileImg(response.user_img || "/assets/icon/profileblack.png"); // Guarda la imagen original
            } catch (error) {
                alert(error);
            }
        } else {
            Swal.fire({
                title: 'Log in first',
                icon: 'info',
                confirmButtonText: 'accept',
                confirmButtonColor: "#1988f0"
            })
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleCancelClick = () => {
        setImagePreview(originalProfileImg);
        setIsEditing(false);
    };
    

    return (
        <div className={`bg-white p-6 rounded-lg shadow-lg w-screen max-w-md mx-auto my-48 transition-all duration-1000 ease-in-out ${isEditing ? 'max-h-screen' : 'max-h-96'}`}>            
            <div className="w-full flex justify-center items-center">
                <h1 className="text-2xl font-semibold text-center text-gray-800">Account details</h1>
                <div onClick={handleEditClick} className="cursor-pointer ml-2">
                    <Image src="/assets/icon/pencil.png" width={20} height={20} alt="Edit" />
                </div>
            </div>
            <div className="relative my-3 w-24 h-24 overflow-hidden rounded-full m-auto">
            {imagenPreview ? (
                <Image
                    src={imagenPreview}
                    width={100}
                    height={100}
                    alt="profile"
                    className="object-cover w-full h-full"
                />
            ) : (
                <Image
                    src={user?.user_img ?? originalProfileImg ?? "/assets/icon/profileblack.png"}
                    width={100}
                    height={100}
                    alt="profile"
                    className="object-cover w-full h-full"
                />
            )}


                {isEditing && (
                    <div className="absolute inset-0 z-50 m-auto bg-gray-transparent flex justify-center items-center">
                        <label htmlFor="file-upload" className="cursor-pointer flex justify-center items-center">
                            <Image src={"/assets/icon/image.png"} width={55} height={55} alt="img" className="object-contain" />
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleEditImageData}
                                className="hidden"
                            />
                        </label>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center py-4 border-b border-t border-gray-200">
                {isEditing ? (
                    <div className="w-full flex justify-between items-center text-gray-600">
                        <p>Name</p>
                        <input
                            type="text"
                            name="name"
                            value={editableData.name}
                            onChange={handleInputChange}
                            placeholder={`${user?.name}`}
                            className="rounded outline-none border-b min-w-56"
                        />
                    </div>
                ) : (
                    <div className="w-full flex justify-between items-center text-gray-600">
                        <p>Name</p>
                        <p>{user?.name}</p>
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
                            placeholder={`${user?.phone}`}
                            className="rounded outline-none border-b min-w-56"
                        />
                    </div>
                ) : (
                    <div className="w-full flex justify-between items-center text-gray-600">
                        <p>Phone</p>
                        <p>{user?.phone}</p>
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
                            placeholder={`${user?.address}`}
                            className="rounded outline-none border-b min-w-56"
                        />
                    </div>
                ) : (
                    <div className="w-full flex justify-between items-center text-gray-600">
                        <p>Address</p>
                        <p>{user?.address}</p>
                    </div>
                )}
            </div>
            {isEditing && (
                <div className="w-full flex justify-between">
                    <button onClick={handleCancelClick} className="w-auto px-3 py-1 bg-neutral-500 rounded-lg mt-3 hover:bg-neutral-400">Cancel</button>
                    <button onClick={handleSaveChanges} className="w-auto px-3 py-1 bg-secondary rounded-lg mt-3 hover:bg-red-700">Save changes</button>
                </div>
            )}
        </div>
    );
};

export default ProfileV;