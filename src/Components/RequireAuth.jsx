// src/components/RequireAuth.jsx
import useValidUser from "../Hooks/useValidUser";

export default function RequireAuth({ children }) {
  const isValidUser = useValidUser(); // true if token valid

  if (!isValidUser) {
    return <>
                <div style={ { padding: 16, color: "red" } }>
                    Not authenticated
                </div>
    
           </>;    
  }

  return children;
}
