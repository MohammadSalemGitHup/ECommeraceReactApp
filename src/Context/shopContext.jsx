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


/* What this file Do ?
    1.Provide all_product data  to App component tree  
    2.Provide cartItems to App component tree 
*/

/////////////////////////////////////////////////////////////////
import { createContext, useState, useEffect } from "react";
// import all_product from "../Components/Assets/all_product"; // getAllProductsFromDB not from localy

//////////////////////////////////////////////////////////////////////////////////
let all_products = [];
export async function getAllProductsFromDB () {
    try{

        const res = await fetch("http://localhost:4000/getallproducts");
        if(!res.ok){
            throw new Error(`Failed to fetch products: ${res.status}`);
        }

        const data = await res.json();

        all_products =  data.products;

        console.log("Products loaded:", all_products);
        return all_products;

    }catch(err){
        console.error("Error fetching products:", err);
        return [];
    }
   
}
///////////////////////////////////////////////////////////////////////////////////





export const MohsalShopContext = createContext(null); // null => (default value; will be replaced by Provider's value)
        
const getDefultCart = () => {
    // create cart Object that represent key value paires from products (productID, productQuantity)
    let cart = {};
    for(let i=0; i < all_products.length; i++){
        cart[i]=0;
    }
    return cart;
}                





/////////////// Provider ///////////////////////////
const MohsalShopContextProvider = (props) => {

    // state
    const [allProducts, setAllProducts] = useState([]);
    // onload get all Products 
    useEffect( () => {
        
        const fetchData = async () => {
        const all_products = await getAllProductsFromDB();
        setAllProducts(all_products);
        };

        fetchData();
        
        
    },[]);


    //state 
    const [cartItems, setCartItems] = useState(getDefultCart());

    const addToCart = (itemId) => {

        setCartItems( (prev) => {
            return {...prev, [itemId]:(prev[itemId] + 1)}
        });
        console.log(`itemId:${itemId} added to cart +1`);
        // console.log(cartItems);
        // add itemId on cart Object at  data base
    }
    ////
    const removeFromCart = (itemId) => {
        setCartItems( prev => {
          return { ...prev, [itemId]:(prev[itemId] - 1) } 
        });
        console.log(`itemId:${itemId} removed from cart -1`);
        // console.log(cartItems);
        // remove itemId on cart Object at  data base
    }
    /////
    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const key in cartItems){ /* loop on dictionary*/
            const item = all_products
            .find( (product) => product.id === Number(key));
            if (item) {
                totalAmount += ( item.new_price * cartItems[key] ); // price × quantity
            }
        }
        return totalAmount;
    }
    /////
    const getTotalCartItem = () => {
         let totalItems = 0;
         for(const key in cartItems){
            if(cartItems[key] > 0){
                totalItems += cartItems[key];
            }
         }
        return totalItems;
    }




    const mohsal_contextValue = {allProducts, // allProducts it is a array value (Pass it as a state)
                                 cartItems, addToCart, removeFromCart,
                                 getTotalCartAmount, 
                                 getTotalCartItem
                                 }; 
    
    return (

        <MohsalShopContext.Provider value={ mohsal_contextValue }>  {/* not forgit the dot here the component render itself many many times (infinite recursion) */}
            {props.children}     {/* my tree that i need to pass data on it  */}   
            
        </MohsalShopContext.Provider>
        
    );
}

export default MohsalShopContextProvider; 