"use client"

import React, { Suspense }  from 'react'
import FormPassword from '@/components/formPassword/formPassword'

const restorePassword = () => {

  return (
    <Suspense  fallback={<div>Loading...</div>}>
    <div>
      < FormPassword />
    </div>
    </Suspense>
  )
}

export default restorePassword
