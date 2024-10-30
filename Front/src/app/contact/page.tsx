'use client'
import FormContact from '@/components/FormContact/FormContact'
import { useRouter } from 'next/navigation';
import React, {useEffect } from 'react'

const Contact = () => {
    const router = useRouter();

    useEffect(() => {
        const userSession = localStorage.getItem("userSession");
        if (!userSession) {
            router.push('/login');
        } 
    }, [router]);
    return (
        <FormContact />
    )
}

export default Contact
