import ProductCardsview from "@/components/productsCard/productCards";
import { getProductsById } from "@/Helpers/products.helper";

import React from 'react'

const ProductDetail:React.FC<{params: {productsId: string}}> = async ({ params }) => {
  const products = await getProductsById(params.productsId);

  return (
    <div>
      <ProductCardsview {...products}/>
    </div>
  )
}

export default ProductDetail
