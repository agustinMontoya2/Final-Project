'use client';

import React, { useEffect, useState } from 'react';
import { IUser, IUserSession } from '@/interfaces/productoInterface';
import { getUsers, banUser, adminUser, editProfile } from '@/lib/server/users';
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

const ViewUsers = () => {
    const router = useRouter();
    const [users, setUsers] = useState<IUser[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editableUserId, setEditableUserId] = useState<string | null>(null);
    const [editableData, setEditableData] = useState({
        name: '',
        phone: '',
        address: ''
    });

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
                const response = await banUser(user_id, token); 
                alert(response);
                fetchUsers();
            } catch (error: any) {
                console.error("Error al banear usuario", error.message);
            }
        } else {
            console.log("No hay token");
        }
    };

    const handleAdmin = async (user_id: string) => {
        if (token) {
            try {
                const response = await adminUser(user_id, token); 
                alert(response);
                fetchUsers();
            } catch (error: any) {
                console.error("Error al asignar admin", error.message);
            }
        } else {
            console.log("No hay token");
        }
    };

    const handleEditClick = (user: IUser) => {
        setIsEditing(true);
        setEditableUserId(user.user_id);
        setEditableData({
            name: user.name || '',
            phone: user.phone || '',
            address: user.address || ''
        });
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setEditableData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        if (token && editableUserId) {
            try {
                await editProfile(editableData, token, editableUserId);
                Swal.fire({
                    icon: 'success',
                    title: 'User updated successfully',
                    toast: true,
                    position: 'top-end',
                    timer: 2500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
                fetchUsers();
                setIsEditing(false);
                setEditableUserId(null);
            } catch (error: any) {
                alert(error.message);
            }
        } else {
            alert("Inicia sesión primero");
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditableUserId(null);
    };

    useEffect(() => {
        if (token) {
            fetchUsers();
        }
    }, [token]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-red-600 mb-6">User List</h2>
            {users.length > 0 ? (
                <table className="w-full border border-red-300 bg-white shadow-lg rounded-lg">
                    <thead className="bg-red-100">
                        <tr>
                            <th className="p-3 border-b font-semibold text-gray-700">User ID</th>
                            <th className="p-3 border-b font-semibold text-gray-700">Name</th>
                            <th className="p-3 border-b font-semibold text-gray-700">Phone</th>
                            <th className="p-3 border-b font-semibold text-gray-700">Address</th>
                            <th className="p-3 border-b font-semibold text-gray-700">Status</th>
                            <th className="p-3 border-b font-semibold text-gray-700">Role</th>
                            <th className="p-3 border-b font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.user_id} className="hover:bg-red-50 transition-colors">
                                <td className="p-3 border-b text-gray-800">{user.user_id}</td>
                                <td className="p-3 border-b text-gray-600">
                                    {isEditing && editableUserId === user.user_id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editableData.name}
                                            onChange={handleInputChange}
                                            className="rounded outline-none border-b min-w-56"
                                        />
                                    ) : user.name || 'N/A'}
                                </td>
                                <td className="p-3 border-b text-gray-600">
                                    {isEditing && editableUserId === user.user_id ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            value={editableData.phone}
                                            onChange={handleInputChange}
                                            className="rounded outline-none border-b min-w-56"
                                        />
                                    ) : user.phone || 'N/A'}
                                </td>
                                <td className="p-3 border-b text-gray-600">
                                    {isEditing && editableUserId === user.user_id ? (
                                        <input
                                            type="text"
                                            name="address"
                                            value={editableData.address}
                                            onChange={handleInputChange}
                                            className="rounded outline-none border-b min-w-56"
                                        />
                                    ) : user.address || 'N/A'}
                                </td>
                                <td className={`p-3 border-b text-sm ${user.isBanned ? 'text-red-500' : 'text-green-500'}`}>
                                    {user.isBanned ? 'Banned' : 'Active'}
                                </td>
                                <td className={`p-3 border-b text-sm ${!user.isAdmin ? 'text-red-500' : 'text-green-500'}`}>
                                    {user.isAdmin ? 'Admin' : 'User'}
                                </td>
                                <td className="p-3 border-b flex space-x-2">
                                    <button
                                        onClick={() => handleBan(user.user_id)}
                                        className={`px-4 py-2 rounded ${user.isBanned ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                                    >
                                        {user.isBanned ? 'Unban User' : 'Ban User'}
                                    </button>
                                    <button
                                        onClick={() => handleAdmin(user.user_id)}
                                        className={`px-4 py-2 rounded ${user.isAdmin ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                                    >
                                        {user.isAdmin ? 'Unadmin User' : 'Admin User'}
                                    </button>
                                    {!isEditing && editableUserId !== user.user_id && (
                                        <button onClick={() => handleEditClick(user)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                                            Edit User
                                        </button>
                                    )}
                                    {isEditing && editableUserId === user.user_id && (
                                        <div className="flex space-x-2">
                                            <button onClick={handleCancelClick} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                                            <button onClick={handleSaveChanges} className="px-4 py-2 bg-blue-500 text-white rounded">Save Changes</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500 text-center">No users found.</p>
            )}
        </div>
    );
};

export default ViewUsers;
