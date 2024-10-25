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
            {users.length > 0 ? (
                <table className="min-w-full bg-white border border-red-300 shadow-lg">
                    <thead>
                        <tr className="bg-red-500 text-white">
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Phone</th>
                            <th className="py-2 px-4 border-b">Address</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Role</th>
                            <th className="py-2 px-4 border-b">Avatar</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
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
                                <td className="py-2 px-4 border-b text-black">
                                    {user.user_img ? (
                                        <img
                                            src={user.user_img}
                                            alt={`${user.name}'s avatar`}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    ) : 'Not Image'}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleBan(user.user_id)}
                                            className={`px-4 py-1 rounded ${user.isBanned ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                                        >
                                            {user.isBanned ? 'Unban User' : 'Ban User'}
                                        </button>
                                        <button
                                            onClick={() => handleAdmin(user.user_id)}
                                            className={`px-4 py-1 rounded ${user.isAdmin ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
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
        </div>
    );
    
};

export default ViewUsers;
