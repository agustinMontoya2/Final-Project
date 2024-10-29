import ViewUsers from '@/components/viewUsers/viewUsers'
import React, { Suspense } from 'react'

const profileAdmin = () => {
  return (
    <Suspense  fallback={<div>Loading...</div>}>

      
    <div>
        <ViewUsers/>
    </div>
    </Suspense>
  )
}

export default profileAdmin
