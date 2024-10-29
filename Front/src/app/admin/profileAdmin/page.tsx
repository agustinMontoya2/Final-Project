import AdminPerfil from '@/components/adminPerfil/adminPerfil'
import React, { Suspense } from 'react'

const profileAdmin = () => {
  return (
    <Suspense  fallback={<div>Loading...</div>}>


    <div>
        <AdminPerfil/>
    </div>
    </Suspense>
  )
}

export default profileAdmin

