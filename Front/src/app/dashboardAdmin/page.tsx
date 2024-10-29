'use client'
import React, { useEffect } from 'react';
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
    if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        if (parsedData && parsedData.user) {
          if(parsedData.isAdmin)
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
