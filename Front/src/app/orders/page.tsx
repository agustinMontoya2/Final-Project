'use client'
import OrdersView from '@/views/OrdersView/order';
import { useRouter } from 'next/navigation';
import React, {useEffect } from 'react';

const Orders = () => {
    const router = useRouter();

    return (
        <div>
            <OrdersView />
        </div>
    );
}

export default Orders;
