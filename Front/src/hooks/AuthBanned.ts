import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthBanned = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const router = useRouter();
  
    useEffect(() => {
      const userSession = localStorage.getItem("userSession");
  
      if (userSession) {
        const session = JSON.parse(userSession);
      
        if (session.isBanned === true) {
          setAuthenticated(true);
        } else {
          router.push("/"); 
        }
      } else {
        router.push("/"); 
      }
    }, [router]);
  
    return authenticated;
  };
  
  export default AuthBanned