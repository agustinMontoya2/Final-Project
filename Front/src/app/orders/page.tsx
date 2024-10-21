'use client'
import OrdersView from '@/components/OrdersView/order'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Orders = () => {
    const router = useRouter();

    useEffect(() => {
        const userSession = localStorage.getItem("userSession");
        if (!userSession) {
            router.push('/login');
        } 
    }, [router]);
    return (
    <div>
        <OrdersView/>
    </div>
    )
}

export default Orders;
