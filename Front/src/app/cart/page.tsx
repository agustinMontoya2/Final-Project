import CartView from '@/components/Cards2/CartView'
import React, { Suspense } from 'react'

const Cart = () => {
  return (
    <Suspense  fallback={<div>Loading...</div>}>


    <div>
        <CartView/>
    </div>
    </Suspense>
  )
}

export default Cart
