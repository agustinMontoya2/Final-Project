// 'use client'

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const AuthValidation = () => {
//   const [authenticated, setAuthenticated] = useState<boolean | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const userSession = localStorage.getItem("userSession");

//     if (userSession) {
//       const session = JSON.parse(userSession);
//       if (session.isAdmin === true) {
//         setAuthenticated(true);
//       } else {
//         setAuthenticated(false);
//         router.push("/");
//       }
//     } else {
//       setAuthenticated(false);
//       router.push("/");
//     }
//   }, [router]);


//   if (authenticated === null)

//   return true;
// };

// export default AuthValidation;
