import ReservasView from '@/components/MyReservations/miReservas'
import AuthBanned from '@/hooks/AuthBanned'
import React from 'react'

const reservas = () => {
  // const esBanneado = AuthBanned()
  // if (esBanneado) return <div>Usted ha sido baneado</div>
  return (
    <div>
      < ReservasView />
    </div>
  )
}

export default reservas
