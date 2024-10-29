import ReservasView from '@/components/MyReservations/miReservas'
import React, { Suspense } from 'react'

const reservas = () => {
  // const esBanneado = AuthBanned()
  // if (esBanneado) return <div>Usted ha sido baneado</div>
  return (
    <Suspense  fallback={<div>Loading...</div>}>
    <div>
      < ReservasView />
    </div>
    </Suspense>
  )
}

export default reservas
