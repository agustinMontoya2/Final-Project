
import FavoritesView from '@/components/favoritesView/favorites';
import React, { Suspense } from 'react';

const Favorites = () => {
    return (

        <Suspense fallback={<div>Loading...</div>}>
         <FavoritesView />;
        </Suspense>
    )
}

export default Favorites;