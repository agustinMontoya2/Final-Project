'use client'
import ProfileV from "@/components/Profile/profile";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Profile = () => {
    const router = useRouter();

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