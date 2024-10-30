import ProductCards from "@/components/productsCard/productCards";
import {  getProduct } from "@/Helpers/products.helper";

import React from 'react'

const ProductDetail:React.FC<{params: {productsId: string}}> = async ({ params }) => {
  const products = await getProduct(params.productsId);


  return (
    <div className="h-screen flex items-center">
      <ProductCards {...products}/>
    </div>
  )
}

export default ProductDetail
