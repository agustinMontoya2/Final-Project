'use client'
import FormContact from '@/components/FormContact/FormContact'
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect } from 'react'

const Contact = () => {
    const router = useRouter();

    useEffect(() => {
        const userSession = localStorage.getItem("userSession");
        if (!userSession) {
            router.push('/login');
        } 
    }, [router]);
    return (
        <Suspense  fallback={<div>Loading...</div>}>
        <FormContact />
        </Suspense>
    )
}

export default Contact
