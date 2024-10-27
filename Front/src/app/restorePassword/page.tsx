"use client"
import ReservasView from '@/components/MyReservations/miReservas'
import AuthBanned from '@/hooks/AuthBanned'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import FormPassword from '@/components/formPassword/formPassword'

const restorePassword = () => {

  const router = useRouter()
  return (
    <div>
      < FormPassword />
    </div>
  )
}

export default restorePassword
