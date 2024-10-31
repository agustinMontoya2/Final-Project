"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const FRONTURL= process.env.NEXT_PUBLIC_FRONTEND_URL;

  useEffect(() => {
    const token = searchParams.get("token_auth0");

    if (token) {
      try {
        const decodedToken = jwt.decode(token) as JwtPayload | null;

        if (decodedToken) {
          const userSessionData = {
            user: {
              user_id: decodedToken.user_id,
              name: decodedToken.name,
              phone: decodedToken.phone,
              address: decodedToken.address,
              user_img: decodedToken.user_img,
            },
            email: decodedToken.email,
            token: token,
            isAdmin: decodedToken.isAdmin,
            isBanned: decodedToken.isBanned,
          };
          localStorage.setItem("userSession", JSON.stringify(userSessionData));
          router.push(`${FRONTURL}`);
        } else {
          console.error("El token no se pudo decodificar");
        }
      } catch (error) {
        console.error("Error al procesar el token:", error);
      }
    } else {
      console.error("No se encontró el token en la URL");
    }
  }, [searchParams, router]);

  return (
      <div>Autenticando...</div>
  );
}
