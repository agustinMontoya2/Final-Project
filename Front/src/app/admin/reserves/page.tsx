
import ViewReserves from '@/components/viewReserves/viewReserves'
import React, { Suspense } from 'react'

const profileAdmin = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>


      <div>
        <ViewReserves />
      </div>
    </Suspense>
  )
}

export default profileAdmin
