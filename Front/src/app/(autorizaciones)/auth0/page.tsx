"use client"

import AuthCallback from "@/components/Auth0-Callback/auth0-callback";
import { Suspense } from "react";

const Auth0Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <AuthCallback />
      </div>
    </Suspense>
  );
};

export default Auth0Page;