import ViewDishes from '@/components/viewDishes/viewDishes'
import React, { Suspense } from 'react'

const profileAdmin = () => {
  return (
    <Suspense  fallback={<div>Loading...</div>}>


    <div>
        <ViewDishes/>
    </div>
    </Suspense>
  )
}

export default profileAdmin
