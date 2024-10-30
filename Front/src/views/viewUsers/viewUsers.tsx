'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IUser, IUserSession } from '@/interfaces/productoInterface';
import { getUsers, banUser, adminUser } from '@/Helpers/users';
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

const ViewUsers = () => {
    const router = useRouter();
    const [users, setUsers] = useState<IUser[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [editableUserId, setEditableUserId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [userData, setUserData] = useState<IUserSession>();
    const [profileImg, setProfileImg] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

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
        const storedUserData = window.localStorage.getItem("userSession");
        if (storedUserData) {
            const parsedData: IUserSession = JSON.parse(storedUserData);
            setToken(parsedData.token);
        }
    }, [router]);

    const fetchUsers = async () => {
        if (token) {
            try {
                const usersData = await getUsers(token);
                setUsers(usersData);
            } catch (error: any) {
                console.error("Error al obtener usuarios", error.message);
            }
        } else {
            console.log("No hay token");
        }
    };

    const handleBan = async (user_id: string) => {
        if (token) {
            try {
                const userToBan = users.find(user => user.user_id === user_id);
                if (!userToBan) return;
                const reason = "por puto"

                const response = await banUser(user_id, token, reason);

                Swal.fire({
                    title: userToBan.isBanned ? 'Unbanned user' : 'Banned user',
                    icon: 'success',
                    timer: 1000,
                });

                fetchUsers();
            } catch (error: any) {
                console.error("Error al banear/desbanear usuario", error.message);
            }
        } else {
            console.log("No hay token");
        }
    };

    const handleAdmin = async (user_id: string) => {
        if (token) {
            try {
                const userToAdmin = users.find(user => user.user_id === user_id);
                if (!userToAdmin) return;

                const response = await adminUser(user_id, token);

                Swal.fire({
                    title: userToAdmin.isAdmin ? 'User is no longer Admin' : 'User is now Admin',
                    icon: 'success',
                    timer: 1000,
                });

                fetchUsers();
            } catch (error: any) {
                console.error("Error al cambiar rol de admin", error.message);
            }
        } else {
            console.log("No hay token");
        }
    };
    const handleEditClick = (user: IUser) => {
        setIsEditing(true);
        setEditableUserId(user.user_id);

    };

    // const handleInputChange = (e: any) => {
    //     const { name, value } = e.target;
    //     setEditableData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };

    // const handleSaveChanges = async () => {
    //     if (token && editableUserId) {
    //         try {
    //             await editProfile(editableData, token, editableUserId);
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'User updated successfully',
    //                 toast: true,
    //                 position: 'top-end',
    //                 timer: 2500,
    //                 showConfirmButton: false,
    //                 timerProgressBar: true,
    //             });
    //             fetchUsers();
    //             setIsEditing(false);
    //             setEditableUserId(null);
    //         } catch (error: any) {
    //             alert(error.message);
    //         }
    //     } else {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'You must log in',
    //             toast: true,
    //             position: 'top-end',
    //             timer: 2500,
    //             showConfirmButton: false,
    //             timerProgressBar: true,
    //         });
    //     }
    // };

    // const handleCancelClick = () => {
    //     setIsEditing(false);
    //     setEditableUserId(null);
    // };

    useEffect(() => {
        if (token) {
            fetchUsers();
        }
    }, [token]);

    // Filtra los usuarios según el término de búsqueda
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [banReason, setBanReason] = useState('');

    const openBanModal = (user_id: string) => {
        setEditableUserId(user_id);
        setIsBanModalOpen(true);
    };

    const handleBanUser = async () => {
        if (token && editableUserId && banReason) {
            try {
                const response = await banUser(editableUserId, token, banReason);
                alert(response);
                fetchUsers();
                setIsBanModalOpen(false);
                setBanReason('');
                setEditableUserId(null);
            } catch (error: any) {
                console.error("Error al banear usuario", error.message);
            }
        } else {
            alert("Please provide a reason for banning.");
        }
    };

    return (
        <div className="w-4/5 container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-red-600 mb-6">User List</h2>
            <div className="mb-5 text-center relative">
                <div className="w-2/5 m-auto flex items-center border rounded-xl bg-white">
                    <Image
                        src="/assets/icon/search.png"
                        alt="Search"
                        width={20}
                        height={20}
                        className="ml-2"
                    />
                    <input
                        type="text"
                        placeholder="Search users by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-none rounded-lg outline-none px-2 py-2 text-gray-700 w-full"
                    />
                </div>
            </div>
            {filteredUsers.length > 0 ? (
                <table className="min-w-full bg-white border border-red-300 shadow-lg">
                    <thead>
                        <tr className="bg-red-500 text-white">
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Phone</th>
                            <th className="py-2 px-4 border-b">Address</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Role</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.user_id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b text-black">{user.name || 'N/A'}</td>
                                <td className="py-2 px-4 border-b text-black">{user.phone || 'N/A'}</td>
                                <td className="py-2 px-4 border-b text-black">{user.address || 'N/A'}</td>
                                <td className={`py-2 px-4 border-b ${user.isBanned ? 'text-red-500' : 'text-green-500'}`}>
                                    {user.isBanned ? 'Banned' : 'Active'}
                                </td>
                                <td className={`py-2 px-4 border-b ${!user.isAdmin ? 'text-red-500' : 'text-green-500'}`}>
                                    {user.isAdmin ? 'Admin' : 'User'}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-evenly">
                                        <button
                                            onClick={() => openBanModal(user.user_id)}
                                            className={`w px-4 py-1 rounded ${user.isBanned ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                                        >
                                            {user.isBanned ? 'Unban User' : 'Ban User'}
                                        </button>
                                        <button
                                            onClick={() => handleAdmin(user.user_id)}
                                            className={`w-36 px-4 py-1 rounded ${user.isAdmin ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                                        >
                                            {user.isAdmin ? 'Unadmin User' : 'Admin User'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500 text-center">No users found.</p>
            )}
            {isBanModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-1/3 bg-white p-5 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-4 text-neutral-700">Ban User</h3>
                        <textarea
                            placeholder="Reason for banning..."
                            value={banReason}
                            onChange={(e) => setBanReason(e.target.value)}
                            className="border rounded p-2 w-full mb-4 text-neutral-700 min-h-12 max-h-36 focus:outline-none"
                        />
                        <div className="flex justify-end">
                            <button onClick={() => setIsBanModalOpen(false)} className="mr-2 px-4 py-2 bg-secondary hover:bg-red-700 rounded">
                                Cancel
                            </button>
                            <button onClick={handleBanUser} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                Confirm Ban
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewUsers;