'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardAdmindV from '@/components/dashboardAdmind/dashboardAdmind';

const DashboardAdmind = () => {
  const router = useRouter();
  
  const [admin, setAdmin] = React.useState(undefined);
  
  useEffect(() => {
    const storedUserData = window.localStorage.getItem("userSession");
    if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        if (parsedData && parsedData.user) {
          if(parsedData.isAdmin) alert("hola admin")
          
            setAdmin(parsedData.isAdmin);
            
        }
    }
}, []);


    useEffect(() => {
      if(admin === false || admin === true) {
        if (!admin) {
            router.push('/menu')}}
    }, [admin]);
  
  return (
      <DashboardAdmindV/>
  );
};

export default DashboardAdmind;
