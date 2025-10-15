
/*  src/hooks/useValidUser.js 
This is a Custom Hook to know  isUserValied ??!! by isValid State

What is this hook importants ??!!
this Hook to protect the hacker make login by add on Application 
auth-token: anyThing.... 
To avoid this case we implement this custom hook to make user verify 
*/
import { useState, useEffect } from "react";

export default function useValidUser() {

  // isValid state 
  const [isValid, setIsValid] = useState(false);

  useEffect( () => {
    const checkToken = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/verifytoken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token, // 👈 Send a token on header 
          },
        });

        if (response.ok) {
          setIsValid(true);
        } else {
          localStorage.removeItem("auth-token");
          setIsValid(false);
        }

      } catch (error) {
        console.error("Token validation error:", error);
        localStorage.removeItem("auth-token");
        setIsValid(false);
      }
    };

    checkToken();
  }, []);

  return isValid;
}
