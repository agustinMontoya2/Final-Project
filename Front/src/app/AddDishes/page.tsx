'use client'
import React, { Suspense } /** , { useEffect } */ from 'react'
import FormularioMenu from '@/components/FormAddDish/FormAddDish'
// import { useRouter } from 'next/navigation';
import AuthValidation from '@/hooks/AuthValidation';

const AddDish = () => {
    // const router = useRouter();
    const esAdmin = AuthValidation()

    if (esAdmin) {
        return <div> you are not admin, sending you BACK!</div>
    }
    
    // useEffect(() => {
    //     const userSession = localStorage.getItem("userSession");
    //     if (!userSession) {
    //         router.push('/login');
    //     }
    // }, [router]);

    return (
        <Suspense  fallback={<div>Loading...</div>}>


        <div>
            <FormularioMenu />
        </div>
        </Suspense>
    )
}

export default AddDish;
