"use client"
import RequestNewPassword from '@/components/requestNewPassword/requestNewPassword'
import AuthBanned from '@/hooks/AuthBanned'
import React from 'react'

const requestNewPassword = () => {
  const esBanneado = AuthBanned()
  if (esBanneado) return <div>Usted ha sido baneado</div>
  return (
    <div>
      < RequestNewPassword />
    </div>
  )
}

export default requestNewPassword
