import ProductCards from "@/components/productsCard/productCards";
import {  getProduct } from "@/Helpers/products.helper";

import React, { Suspense } from 'react'

const ProductDetail:React.FC<{params: {productsId: string}}> = async ({ params }) => {
  const products = await getProduct(params.productsId);


  return (
    <Suspense  fallback={<div>Loading...</div>}>
    <div className="h-screen flex items-center">
      <ProductCards {...products}/>
    </div>
    </Suspense>
  )
}

export default ProductDetail
