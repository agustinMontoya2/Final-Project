'use client'
import FormReserve from '@/components/FormReserve/FormReserve';
import AuthBanned from '@/hooks/AuthBanned';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';

const Reserve = () => {
  const router = useRouter();
  const esBanneado = AuthBanned();

  useEffect(() => {
    if (esBanneado) return; // No hacer nada si el usuario está baneado

    const userSession = localStorage.getItem("userSession");
    if (!userSession) {
      router.push('/login');
    }
  }, [router, esBanneado]);

  if (esBanneado) {
    return <div>Usted ha sido baneado</div>;
  }

  return (
    
    <Suspense  fallback={<div>Loading...</div>}>
      <FormReserve />
    </Suspense>
    
  );
}

export default Reserve;
