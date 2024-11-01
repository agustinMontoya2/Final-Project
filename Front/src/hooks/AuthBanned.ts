// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const AuthBanned = () => {
//   const [authenticated, setAuthenticated] = useState<boolean | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const userSession = localStorage.getItem("userSession");

//     if (userSession) {
//       const session = JSON.parse(userSession);
//       if (session.isBanned === false) {
//         setAuthenticated(true);
//       } else {
//         setAuthenticated(true);
//         router.push("/");
//       }
//     } else {
//       // setAuthenticated(false);
//       // router.push("/");
//     }
//   }, [router]);

//   if (authenticated === null) return authenticated;
// };

// export default AuthBanned;
