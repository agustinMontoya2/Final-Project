'use client'
import OrdersView from '@/components/OrdersView/order';
import AuthBanned from '@/hooks/AuthBanned';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Orders = () => {
    const router = useRouter();
    const esBanneado = AuthBanned();

    useEffect(() => {
        if (esBanneado) return; // Evita redireccionar si el usuario está baneado

        const userSession = localStorage.getItem("userSession");
        if (!userSession) {
            router.push('/login');
        }
    }, [router, esBanneado]);

    if (esBanneado) {
        return <div>Usted ha sido baneado</div>;
    }

    return (
        <div>
            <OrdersView />
        </div>
    );
}

export default Orders;
