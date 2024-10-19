import { getProductsDBdetail } from '@/Helpers/products.helper';
import Image from 'next/image';
import React from 'react';

const CartView = async () => {
  // const CartDetail = await getProductsDBdetail();
  // console.log(CartDetail);

  // // Verifica si CartDetail es un array
  // if (!Array.isArray(CartDetail)) {
  //   return <p>No se encontraron productos en el carrito.</p>;
  // }

  return (
      <div className='w-1/3 h-auto bg-primary m-auto shadow-xl rounded-xl p-5 flex text-neutral-800 '>
        <div className='relative w-1/4 h-24'>
          <Image src={"/assets/icon/person.png"} layout='fill' objectFit='contain' alt={"aaa"} className='w-full h-auto'></Image>
        </div>
        <div className='w-1/2'>
          <h1 className='text-xl font-bold'>Name</h1>
          <p className='line-clamp-3'>Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, unde.</p>
        </div>
        <div className='w-1/4 flex flex-col items-end justify-between'>
          <div className=''>
            <p>Price x Unidad</p>
            <p>Quantity: 2</p>
            <p> $SubTotal</p>
          </div>
          {/* <button className='w-16 text-white bg-secondary rounded-md px-3 py-1 hover:bg-red-700'>
            Pagar
          </button> */}
        </div>
      </div>
    // <div className="flex flex-col items-center">
      /* {CartDetail.map((productDetail) => (
        <div key={productDetail.product_detail_id} className="flex flex-col bg-white p-4 rounded-sm shadow-md m-1 w-full md:w-1/2 lg:w-1/3">
          <div className="flex flex-row items-center">
            <div className='relative w-40 h-40'>
              <Image
                src={productDetail.product.image_url}
                alt={productDetail.product.product_name}
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
        <button className='text-black bg-secondary rounded-md p-1'>
          Pagar
        </button>
      </div>
    </div> */
  );
}

export default CartView;
