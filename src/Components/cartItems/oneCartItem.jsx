

import remove_icone from "../Assets/cart_cross_icon.png";
import "./oneCartItem.css";



const OneCartItem = ( {removeFromCart, item, cartItems} ) => {
    const itemId = item.id;

    /////////jsx ///////////
  return (
    <div>

        <div>
             <div className="cartItems-format">
                <img src={item.image} alt=""  />
                <p>{item.name}</p>
                <p>{`$`}{item.new_price}</p>
                <button className="cartItems-quantity">  { cartItems[item.id] }  </button>
                <p> { item.new_price*cartItems[item.id] } </p>
                <img src={remove_icone} alt=""  onClick={()=>removeFromCart(itemId)}
                 className="del-image"
                />
            </div>
            <hr />
        </div>

    </div>
  )
}

export default OneCartItem;



