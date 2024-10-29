import React, { Suspense } from "react"
import Register from "@/components/Register/Register"
export default function register() {
    return (
        
            <Suspense fallback={<div>Loading...</div>}>
          <Register />
            </Suspense>
        
    )
}