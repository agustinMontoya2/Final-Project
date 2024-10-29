import ViewReviews from '@/components/viewReviews/viewReviews'
import React, { Suspense } from 'react'

const profileAdmin = () => {
  return (
    <Suspense  fallback={<div>Loading...</div>}>


    <div>
        <ViewReviews/>
    </div>
    </Suspense>
  )
}

export default profileAdmin
