'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ModifyDishes = () => {
  const [admin, setAdmin] = React.useState(undefined);
  const router = useRouter();
  
  useEffect(() => {
    const storedUserData = window.localStorage.getItem("userSession");
    if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        if (parsedData && parsedData.user) {
            setAdmin(parsedData.admin);
            
        }
    }
}, []);


useEffect(() => {
  if(admin === false || admin === true) {
    if (!admin) {
        router.push('/menu')}}
}, [admin]);


  return (
    <div>
      <p>
        acá va la logica para modificar platos de comida
      </p>
    </div>
  )
}

export default ModifyDishes
