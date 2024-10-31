'use client'
import Profile from '@/components/Profile/profile'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminPerfil = () => {
  const [admin, setAdmin] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if(typeof window  !== 'undefined'){

    const storedUserData = window.localStorage.getItem("userSession");
    if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        if (parsedData && parsedData.user) {
            setAdmin(parsedData.admin);
            } 
        }
    }
}, []);


useEffect(() => {
  if(admin === false || admin === true) {
    if (!admin) {
        router.push('/menu')}}
}, [admin]);

  return (
    <Profile/>
  )
}

export default AdminPerfil
