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
    const [cartItems, setCartItems] = useState({});

    // Monitoring On State
    useEffect(() => {

        console.log("cart Changes....");
        
    },[cartItems]);

    /////////////////////
    useEffect(() => {
        const fetchCart = async () => {
        const data = await getCartFromDB();
        if (data) {
            setCartItems(data); // ✅ update state after data arrives
        }
    };

  fetchCart();
}, []);

    const addToCart = async (itemId) => {
        
        console.log(`itemId:${itemId} added to cart +1`);
        
        // add itemId on cart Object at data base
        const data_response = await addItemOnCartInDb(itemId);
        if( data_response.success === true ){
            
            setCartItems( data_response.cartData);
            alert("added item on Db Suseccfuly ....");
        }
        else{
            alert("added item on Db Not Sccess ....?");
        }
    }
    ////
    const removeFromCart = async (itemId) => {
        
        console.log(`itemId:${itemId} removed from cart -1`);

        // remove itemId from cart Object at  data base
        const data_response = await removeItemFromCartInDb(itemId);
        if( data_response.success === true ){
            setCartItems( data_response.cartData);
            alert("remove Item from Db Suseccfuly ....");
        }
    }
    /////
    const clearCart = async () => {
        console.log("🛒 Clearing entire cart...");
        // Clear cartItems in the database
        const data_response = await clearCartInDb();
        if (data_response.sucess === true) {
        // 🧹 Set the cart to an empty object
        setCartItems({});
        alert("All items removed from cart ✅");
        } else {
            alert("Failed to clear cart ❌");
        }     
    };


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
                                 cartItems, addToCart, removeFromCart, clearCart,
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






///////////////// Functionality /////////////////



//////////////////////////////////////////////////////////////////////
/////////// addItemOnCartInDb, removeItemFromCartInDb //////////////////
////////////////////////////////////////////////////////////////////////
const addItemOnCartInDb = async (itemId) => {

    const id = itemId;
    try{
        console.log(`product id : ${id}`);
   
        const response = await fetch('http://localhost:4000/addtocart', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
            body: JSON.stringify({ itemId }),
            });
       
        if(!response.ok){
            alert(`Failed addItemOnCartInDb ${id} (HTTP ${response.status}), ${response.err}`);
            throw new Error(`Failed To Delete Product ${id} (HTTP ${response.status})`);
        }

        const data_response = await response.json();

        return data_response;   

        
    }catch(err){
        console.error(err);
        alert(`Catch : Failed addItemOnCartInDb : ${id}`);
    }
}

////////////////////
const removeItemFromCartInDb = async (itemId) => {
    const id = itemId;
    try{
        console.log(`product id : ${id}`);
   
        const response = await fetch('http://localhost:4000/removefromcart', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token")
            },
            body: JSON.stringify({ itemId }),
            });
       
        if(!response.ok){
            alert(`Failed removeItemFromCartInDb ${id} (HTTP ${response.status}), ${response.err}`);
            throw new Error(`Failed To remove Product ${id} (HTTP ${response.status})`);
        }

        const data_response = await response.json();

        return data_response;
       


    }catch(err){
        console.error(err);
        alert(`Catch : Failed To Delete Product : ${id}`);
        return false;
    }

}







//////////////////////////////////

const getCartFromDB = async () => {
  try {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      console.warn("⚠️ No token found — user is not logged in");
      return null;
    }

    const res = await fetch("http://localhost:4000/getcartData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,   // 👈 send token to middleware
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch cart. Status: ${res.status}`);
    }

    const data = await res.json();
    // console.log("🛒 Cart from DB:", data.cartData);
    let cartData = {};
    cartData = data.cartData;
    return cartData; 

  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    return null;
  }
};


////////////// Wrap the backend endpoint here //////////// 

const clearCartInDb = async () => {
    
  try {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      console.warn("⚠️ No token found — user is not logged in");
      console.log("You are not Login !!!!!!");alert("You are not Login !!!!!!")
      return { sucess: false };
    }

    const res = await fetch("http://localhost:4000/setcartData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to clear cart. Status: ${res.status}`);
    }

    const data = await res.json();

    if (data.sucess === true) {
      console.log("🧹 Cart cleared in DB successfully");
      return data;
    } else {
      console.warn("⚠️ Cart clear failed on server");
      return { sucess: false };
    }

  } catch (err) {
    console.error("catch:❌ Error in clearCartInDb", err);
    return { sucess: false };
  }
};