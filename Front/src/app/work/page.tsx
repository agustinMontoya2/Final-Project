'use client'

import FormWork from "@/views/FormsViews/FormWork"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react"
const Contact = () => {
    const router = useRouter();

    // useEffect(() => {
    //     const userSession = localStorage.getItem("userSession");
    //     if (!userSession) {
    //         router.push('/login');
    //     } 
    // }, [router]);
    return(
        <FormWork />
    )
}
export default Contact;