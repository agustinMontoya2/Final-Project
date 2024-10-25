"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken"; // Importar jsonwebtoken

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token_auth0");

    if (token) {
      try {
        // Decodificar el token JWT para extraer el payload
        const decodedToken = jwt.decode(token) as JwtPayload | null;

        if (decodedToken) {
          // Crear el objeto de sesión con la información del token
          const userSessionData = {
            user: {
              user_id: decodedToken.user_id, // ID del usuario
              name: decodedToken.name, // Nombre del usuario
              phone: decodedToken.phone,
              address: decodedToken.address,
              user_img: decodedToken.user_img,
              // Agrega aquí otros campos que necesites.
            },
            email: decodedToken.email,
            token: token, // Agregar el token también
            isAdmin: decodedToken.isAdmin,
          };

          // Almacenar en localStorage
          localStorage.setItem("userSession", JSON.stringify(userSessionData));

          // Redirigir a la página deseada
          router.push("http://localhost:4000");
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

  return <div>Loading...</div>;
}
