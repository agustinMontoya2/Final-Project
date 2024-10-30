import FavCard from '@/views/FavCard/favCard';
import { IProducts } from '@/interfaces/productoInterface';
import { getFavorities } from '@/Helpers/favorities';
import React from 'react';


const Fav = async ({ params }: { params: { productsId: string; userId: string } }) => {
  const token = "";
  try {
    const products: IProducts[] = await getFavorities(params.userId, token);

    return (
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <FavCard key={product.product_id} favorite={product} />
          ))
        ) : (
          <div>No hay productos favoritos.</div>
        )}
      </div>
    );
  } catch (error) {
    return <div>Error al cargar los productos favoritos</div>;
  }
}

export default Fav;