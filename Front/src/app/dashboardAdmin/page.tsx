'use client'
import React, { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardAdmindV from '@/components/dashboardAdmin/dashboardAdmind';
import AuthValidation from '@/hooks/AuthValidation';


const DashboardAdmind = () => {
  const router = useRouter();
  const esAdmind = AuthValidation()


  if (esAdmind) {
    return <div> redirigiendo a menu...</div>
  }
  router.push("/menu")




  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardAdmindV />
    </Suspense>
  );
};

export default DashboardAdmind;
