
"use client"
import Cards from '@/components/Cards/Cards';
import AuthBanned from '@/hooks/AuthBanned';
import React from 'react';

const Menu = () => {
    const esBanneado = AuthBanned()
    if (esBanneado) {
    return <div> funciona </div>
}
         
    
    return (
        <div>
            <Cards />
        </div>
    );
};

export default Menu;
