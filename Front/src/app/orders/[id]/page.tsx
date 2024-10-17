'use client'
import React, { useEffect } from 'react'
import OrderDetail from "@/components/OrderDetail/orderDetail";
import { useRouter } from 'next/navigation';

const OrdersId = () => {
    const router = useRouter();

    useEffect(() => {
        const userSession = localStorage.getItem("userSession");
        if (!userSession) {
            router.push('/login');
        } 
    }, [router]);
    return (
    <div>
        <OrderDetail/>
    </div>
    )
}

export default OrdersId;
