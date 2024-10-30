import LoginForm from "@/components/Login/Login"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import React from "react"


const Login:React.FC=()=> {
    return (

        <>
            <UserProvider>
                <LoginForm />
            </UserProvider>
        </>

    )
}   

export default Login