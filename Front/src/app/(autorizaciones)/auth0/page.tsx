import AuthCallback from "@/components/Auth0-Callback/auth0-callback"; // Asegúrate de que la ruta sea correcta
import React from "react";

const Auth0Page = () => {
  return (
    <div>
      <AuthCallback />
    </div>
  );
};

export default Auth0Page;
