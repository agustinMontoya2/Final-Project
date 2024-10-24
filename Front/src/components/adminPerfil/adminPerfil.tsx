'use client'
import ProfileV from '@/components/Profile/profile'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminPerfil = () => {
  const [admin, setAdmin] = React.useState(undefined);
  const router = useRouter();
  
  useEffect(() => {
    const storedUserData = window.localStorage.getItem("userSession");
    if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        if (parsedData && parsedData.user) {
            setAdmin(parsedData.admin);
            
        }
    }
}, []);


useEffect(() => {
  if(admin === false || admin === true) {
    if (!admin) {
        router.push('/menu')}}
}, [admin]);

  return (
    <ProfileV/>
  )
}

export default AdminPerfil
