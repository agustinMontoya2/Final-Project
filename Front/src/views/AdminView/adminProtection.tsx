"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const AdminProtection = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storeUserData = window.localStorage.getItem("userSession");
      if (storeUserData) {
        const parseData = JSON.parse(storeUserData);
        setIsAdmin(parseData.isAdmin);
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/menu');
    }
  }, [isAdmin, router]);

  return (
    <div>
      <h1 className='text-black text-lg text-center font-blod'> WELCOME ADMIN </h1>
    </div>
  )
}

export default AdminProtection