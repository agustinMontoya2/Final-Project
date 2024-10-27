'use client'
import ProfileV from "@/components/Profile/profile";
import AuthBanned from "@/hooks/AuthBanned";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Profile = () => {
    const router = useRouter();
    const esBanneado = AuthBanned()
   if (esBanneado) return  <div>Usted ha sido baneado</div>


    useEffect(() => {
        const userSession = localStorage.getItem("userSession");
        if (!userSession) {
            router.push('/login');
        } 
    }, [router]);

    return (
        <div>
            <ProfileV/>
        </div>
    )
}

export default Profile