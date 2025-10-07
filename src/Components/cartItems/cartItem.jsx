

import "./cartItem.css";
import { useContext } from "react";
import { MohsalShopContext } from "../../Context/shopContext";
import OneCartItem from "./oneCartItem";


const CartItem = () => {
      
    // Consum data from context 
    const {all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(MohsalShopContext);
    const products = all_product; // Extract array 

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
                                    <button className="checkout-btn">PROCEED TO CHECKOUT</button>
                                </div>
                            </div>
                        </>
                        : null 
        }

       
    

    </div>
   
  )
}

export default CartItem;