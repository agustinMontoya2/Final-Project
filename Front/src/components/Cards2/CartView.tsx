import { getProductsDBdetail } from '@/Helpers/products.helper'
import Image from 'next/image';
import React from 'react'

const CartView = async () => {
  const CartDetail = await getProductsDBdetail();
  console.log(CartDetail)

  return (
    <div className="flex flex-col items-center">
      {CartDetail.map((productDetail) => (
        <div key={productDetail.product_detail_id} className="flex flex-col bg-white p-4 rounded-sm shadow-md m-1 w-full md:w-1/2 lg:w-1/3">
          <div className="flex flex-row items-center">
            <div className='relative w-40 h-40'>
              <Image
                src={productDetail.product.image_url}
                alt={productDetail.product.name}
                layout="fill"
                objectFit="contain"
                className="w-full h-auto"
              />
            </div>
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
