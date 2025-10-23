

import "./cartItem.css";
import { useContext } from "react";
import { MohsalShopContext } from "../../Context/shopContext";
import OneCartItem from "./oneCartItem";
import { Link } from "react-router-dom";


const CartItem = () => {
      
    // Consum data from context 
    const {allProducts, cartItems, removeFromCart, clearCart,getTotalCartAmount } = useContext(MohsalShopContext);
    const products = allProducts; // Extract array 

    

    const isItemAtcartItems = ()=>{
        for(const key in cartItems){ /* loop on dictionary*/
            if(cartItems[key] > 0){
            // console.log("yes, it isItemAtcartItems");
             return true
            }
        }
        return false;
    }




    /////// JSX ///////////
  return (

    <div className="cartItems">
        {/* <h1>hi cartItem component</h1> */}

        <div className="cartItems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
            <button className="btn-clearCart" onClick={clearCart}>Clear Cart</button>
        </div>
        <hr /> 
        
        {
          ( !isItemAtcartItems() )?
                        <div className="defult-cartItems">
                            <p>No any Products Selected</p>
                        </div>
                        : null 
        }

        {
        products? 
            products.map( (item) => {
                const itemId = item.id;
                if( cartItems[itemId] > 0)/*there exist item on cart*/{
                      return  <OneCartItem key={item.id} item={item} removeFromCart={removeFromCart} cartItems={cartItems} />
                }
                else {
                    return null;
                }

            })

            : <><p>There is No products</p></>
        }


        {/* ////Cart Total ///// */}

        {
          ( isItemAtcartItems() )?
                        <>
                            <div className="cartitems-down">
                                <div className="cartitems-total-box">
            
                                    <div className="cartitems-total-item">
                                        <h3>Total</h3>
                                        <h3>${getTotalCartAmount()}</h3>
                                    </div>

                                    
                                    <Link to={"/payment"} className="checkout-btn">
                                        PROCEED TO CHECKOUT
                                    </Link>

                                </div>
                            </div>
                        </>
                        : null 
        }

       
    

    </div>
   
  )
}

export default CartItem;