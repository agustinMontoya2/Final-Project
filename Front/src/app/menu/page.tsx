
import Cards from '@/components/Cards/Cards';
// import AuthBanned from '@/hooks/AuthBanned';
import React, { Suspense } from 'react';

const Menu = () => {    
    return (
        <div>
            <Suspense fallback={<div>Cargando...</div>}>
                <Cards />
            </Suspense>
        </div>
    );
};

export default Menu;
