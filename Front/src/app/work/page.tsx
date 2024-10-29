'use client'
import FormWork from "@/components/FormWork/FormWork"
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect } from "react"
const Contact = () => {
    const router = useRouter();

    useEffect(() => {
        const userSession = localStorage.getItem("userSession");
        if (!userSession) {
            router.push('/login');
        } 
    }, [router]);
    return(
        <Suspense  fallback={<div>Loading...</div>}>
        <FormWork />
        </Suspense>
    )
}
export default Contact;