import Login from "@/components/Login/Login"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import React from "react"


export default function login() {
    return (
        <UserProvider>
            <Login />
        </UserProvider>
    )
}   