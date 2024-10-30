'use client'
import React, {useEffect } from 'react';
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
      <DashboardAdmindV/>
  );
};

export default DashboardAdmind;
