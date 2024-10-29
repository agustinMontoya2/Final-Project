'use client'
import React, { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardAdmindV from '@/components/dashboardAdmin/dashboardAdmind';
import AuthValidation from '@/hooks/AuthValidation';


const DashboardAdmind = () => {
  const router = useRouter();
  const esAdmind= AuthValidation()

  
  const [admin, setAdmin] = React.useState(undefined);
if(esAdmind){
  return <div> redirigiendo a menu...</div>
}
  
useEffect(() => {
  const storedUserData = window.localStorage.getItem("userSession");
  const parsedData = storedUserData ? JSON.parse(storedUserData) : null;

  // Si parsedData y parsedData.user existen, se establece el estado de admin
  if (parsedData?.user) {
      setAdmin(parsedData.isAdmin);
  }
}, []);

useEffect(() => {
  // Redirige si admin es false
  if (admin === false) {
      router.push('/menu');
  }
}, [admin]);
  return (
    <Suspense  fallback={<div>Loading...</div>}>
      <DashboardAdmindV/>
    </Suspense>
  );
};

export default DashboardAdmind;
