import React, { Suspense } from 'react'
import FormPassword from '@/views/FormsViews/formPassword'

const restorePassword = () => {

  return (
    <div>
      <Suspense fallback={<div>Cargando...</div>}>
        <FormPassword />
      </Suspense>
    </div>
  )
}

export default restorePassword
