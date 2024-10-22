'use client'
import React, { useEffect } from 'react'
import FormularioMenu from '@/components/FormAddDish/FormAddDish'
import { useRouter } from 'next/navigation';

const AddDish = () => {
    const router = useRouter();

    useEffect(() => {
        const userSession = localStorage.getItem("userSession");
        if (!userSession) {
            router.push('/login');
        } 
    }, [router]);
     
return (
    <div>
        <FormularioMenu/>
    </div>
)
}

export default AddDish;
