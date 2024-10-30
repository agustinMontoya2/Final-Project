import Login from "@/components/Login/Login"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import React, { Suspense } from "react"


export default function login() {
    return(
        
<>
<Suspense fallback={<div>Loading...</div>}>


                <UserProvider>
            <Login />
                </UserProvider>
                </Suspense>
</>

    
        
    )
}   