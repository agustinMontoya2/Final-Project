import { IUserSession } from '@/interfaces/productoInterface';
import React, { useEffect, useState } from 'react'

export default function Banned() {
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [banReason, setBanReason] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editableUserId, setEditableUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);


    const openBanModal = (user_id: string) => {
        setEditableUserId(user_id);
        setIsBanModalOpen(true);
    };

    useEffect(() => {
        const storedUserData = window.localStorage.getItem("userSession");
        if (storedUserData) {
            const parsedData: IUserSession = JSON.parse(storedUserData);
            setToken(parsedData.token);
        }
    }, []);

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
        <div>
            <button
                onClick={() => openBanModal(user.user_id)}
                className={`w px-4 py-1 rounded ${user.isBanned ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
            >
                {user.isBanned ? 'Unban User' : 'Ban User'}
            </button>
        </div>
  )
}
