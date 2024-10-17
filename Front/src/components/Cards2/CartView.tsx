import { getProductsDBdetail } from '@/helpers/products.helper'
import React from 'react'

const CartView = async () => {
  const CartDetail = await getProductsDBdetail();
  console.log(CartDetail)

  return (
    <div className="flex flex-col items-center">
      {CartDetail.map((productDetail) => (
        <div key={productDetail.product_detail_id} className="flex flex-col bg-white p-4 rounded-sm shadow-md m-1 w-full md:w-1/2 lg:w-1/3">
          <div className="flex flex-row items-center">
            <img
              src={productDetail.product.image_url}
              alt={productDetail.product.name}
              className="w-32 h-32 object-cover rounded-lg mr-4"
            />
            <div className="flex flex-grow justify-around">
              <p className='text-black text-center'>Nota: {productDetail.note}</p>
              <p className='text-black text-center'>{productDetail.quantity}</p>
            </div>
          </div>
          <div className="flex justify-end mt-auto">
            <p className='text-black'>Subtotal: {productDetail.subtotal}</p>
          </div>
        </div>
      ))}
      <div>
        <button className='text-black bg-secondary rounded-md  p-1'>
          Pagar
        </button>
      </div>
    </div>

  )
}

export default CartView
