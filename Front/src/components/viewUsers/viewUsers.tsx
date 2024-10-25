'use client';

import React, { useEffect, useState } from 'react';
import { IUser } from '@/interfaces/productoInterface';
import { getUsers, banUser, adminUser } from '@/lib/server/users';
import { useRouter } from 'next/navigation';

const ViewUsers = () => {
    const router = useRouter();
    const [users, setUsers] = useState<IUser[]>([]);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedUserData = window.localStorage.getItem("userSession");
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            if (parsedData && parsedData.user) {
                setToken(parsedData.token);
            }
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
                console.log(response);
                 
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
                console.log(response);
                 
                fetchUsers();
            } catch (error: any) {
                console.error("Error al admin usuario", error.message);
            }
        } else {
            console.log("No hay token");
        }
    };

    useEffect(() => {
        if (token) {
            fetchUsers();
        }
    }, [token]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-red-600 mb-6">User List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.user_id} className="bg-white shadow-lg rounded-lg p-6 border border-red-300 flex flex-col justify-between">
                            <div>
                                <p className="text-lg font-semibold text-gray-800 mb-2">User ID: {user.user_id}</p>
                                <p className="text-gray-600">Name: {user.name || 'N/A'}</p>
                                <p className="text-gray-600">Phone: {user.phone || 'N/A'}</p>
                                <p className="text-gray-600">Address: {user.address || 'N/A'}</p>
                                <p className={`text-sm ${user.isBanned ? 'text-red-500' : 'text-green-500'}`}>
                                    {user.isBanned ? 'Banned' : 'Active'}
                                </p>
                                <p className={`text-sm ${!user.isAdmin ? 'text-red-500' : 'text-green-500'}`}>
                                    {user.isAdmin ? 'Admin' : 'User'}
                                </p>
                                {user.user_img && (
                                    <img
                                        src={user.user_img}
                                        alt={`${user.name}'s avatar`}
                                        className="mt-4 w-16 h-16 rounded-full object-cover"
                                    />
                                )}
                            </div>
                            <button
                                onClick={() => handleBan(user.user_id)}
                                className={`mt-4 px-4 py-2 rounded ${user.isBanned ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                            >
                                {user.isBanned ? 'Unban User' : 'Ban User'}
                            </button>
                            <button
                                onClick={() => handleAdmin(user.user_id)}
                                className={`mt-4 px-4 py-2 rounded ${user.isAdmin ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                            >
                                {user.isBanned ? 'Unadmin User' : 'Admin User'}
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-3">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewUsers;
