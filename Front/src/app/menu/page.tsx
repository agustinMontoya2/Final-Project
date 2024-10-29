
"use client"
import Cards from '@/components/Cards/Cards';
import AuthBanned from '@/hooks/AuthBanned';
import React, { Suspense } from 'react';

const Menu = () => {
    const esBanneado = AuthBanned()
    if (esBanneado) {
    return <div> funciona </div>
}
         
    
    return (
        <Suspense  fallback={<div>Loading...</div>}>
        <div>
            <Cards />
        </div>
        </Suspense>
    );
};

export default Menu;
