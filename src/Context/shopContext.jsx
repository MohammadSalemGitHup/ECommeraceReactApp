/*
What is the Props ? 
    (variables, functions name(refrunces)) 
            that passed from parent to child in DOM tree 
What Context in React means ?
    without pass props at all child in (Prop Drilling) Concept
    Context store/save this props-(variables,function.. that passed)- in global state
*/
/*
Again, What is Context, Provider, useContext
    Context = A central place to store data (like a global variable but organized inside React).
    Provider = The component that makes the data available to all children in its tree.
    useContext = A React hook to access (read) the data from Context inside any component.
*/
/*
Note:
Context and Provider written in PascalCase  => MohsalShopContext
*/
import { createContext } from "react";
import all_product from "../Components/Assets/all_product";

export const MohsalShopContext = createContext([]); // null => (default value; will be replaced by Provider's value)
                                        // [] this means context will be return a array value

const MohsalShopContextProvider = (props) => {

    const mohsal_contextValue = all_product; // array value
    
    
    return (

        <MohsalShopContext.Provider value={ mohsal_contextValue }>  {/* not forgit the dot here the component render itself many many times (infinite recursion) */}
            {props.children}     {/* my tree that i need to pass data on it  */}   
            
        </MohsalShopContext.Provider>
        
    );
}

export default MohsalShopContextProvider; 