'use client'
import FormReserve from '@/components/FormReserve/FormReserve'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Reserve = () => {
  const router = useRouter();

    useEffect(() => {
        const userSession = localStorage.getItem("userSession");
        if (!userSession) {
            router.push('/login');
        } 
    }, [router]);
    return (
      <>
        <FormReserve />
        {/* <MyReservations /> */}
      </>
    )
  }

  export default Reserve