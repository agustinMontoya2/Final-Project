'use client'
import AuthValidation from '@/hooks/AuthValidation';
import { useRouter } from 'next/router';
import React from 'react'

const AdmindDashboard:React.FC = () => {
    // const router = useRouter();
    // const esAdmind = AuthValidation()
  
  
    // if (esAdmind) {
    //   return <div> redirigiendo a menu...</div>
    // }
     // router.push("/menu")
  return (
    <div className="text-black">
    <p>Admin</p>
    </div>
  )
}

export default AdmindDashboard
