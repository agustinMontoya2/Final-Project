"use client"
import RequestNewPassword from '@/components/requestNewPassword/requestNewPassword'
import AuthBanned from '@/hooks/AuthBanned'
import React, { Suspense } from 'react'

const requestNewPassword = () => {
  const esBanneado = AuthBanned()
  if (esBanneado) return <div>Usted ha sido baneado</div>
  return (
    <Suspense  fallback={<div>Cargando...</div>}>
    <div>
      < RequestNewPassword />
    </div>
    </Suspense>
  )
}

export default requestNewPassword
