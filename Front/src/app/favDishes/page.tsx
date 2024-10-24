import FavCard from '@/app/favDishes/favCard';
import { getFavorities } from '@/lib/server/favorities';
import React from 'react';

const Fav: React.FC<{ params: {productsId: string, userId: string }}> = async ({ params }) => {
  try {
    const products = await getFavorities(params.userId); 

    return (
      <div>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <FavCard key={params.productsId} favorite={product} />
          ))
        ) : (
          <div>No hay productos favoritos.</div>
        )}
      </div>
    </div>
    );
  } catch (error) {
    return <div>Error al cargar los productos favoritos</div>;
  }
}

export default Fav;