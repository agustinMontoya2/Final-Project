import FavCard from '@/app/favDishes/favCard';
import { IProducts } from '@/interfaces/productoInterface';
import { getFavorities } from '@/lib/server/favorities';
import React from 'react';

// Asegúrate de que este componente se exporte como una página
const Fav = async ({ params }: { params: { productsId: string; userId: string } }) => {
  const token = ""; // Debes definir cómo obtendrás el token aquí
  try {
    const products: IProducts[] = await getFavorities(params.userId, token); 

    return (
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <FavCard key={product.product_id} favorite={product} /> // Usa una propiedad única del producto
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