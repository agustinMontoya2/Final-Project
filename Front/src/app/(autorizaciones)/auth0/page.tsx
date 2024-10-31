"use client"

import AuthCallback from "@/components/Auth0-Callback/auth0-callback";
import { Suspense } from "react";


const Auth0Page = () => {
  return (
      <div>
        <Suspense fallback={<div>Cargando...</div>}>
          <AuthCallback />
        </Suspense>
      </div>
  );
};

export default Auth0Page;