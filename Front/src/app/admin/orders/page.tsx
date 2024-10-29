import ViewOrders from '@/components/viewOrders/viewOrders'
import React, { Suspense } from 'react'

const profileAdmin = () => {
  return (
    <Suspense  fallback={<div>Loading...</div>}>
    <div>
        <ViewOrders/>
    </div>
    </Suspense>
  )
}

export default profileAdmin
