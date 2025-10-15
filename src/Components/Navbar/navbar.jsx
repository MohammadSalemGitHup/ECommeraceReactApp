import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"

import logo_src from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import { MohsalShopContext } from '../../Context/shopContext'
import useValidUser from "../../Hooks/useValidUser";




////////////////////////////////
const Navbar = (  ) => {

    // state (change the hr under Shop, Men, Women, Kids)
    const [navMenu, setNavMenu] = useState("");

    // Context Consumer 
    const {getTotalCartItem} = useContext(MohsalShopContext); 


    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        window.location.reload();            
    };

    // use hook 
    const isValidUser = useValidUser();


    ///////// JSX //////////////
  return (
    <div className='navbar'>
        
        <div className="nav-logo">
            <Link to="/" style={{textDecoration:"none"}}>
                <img src={logo_src} alt="nav-logo" />
            </Link>
            <Link to="/" style={{textDecoration:"none"}}>
                <p>Shooper</p>
            </Link>
        </div>

       <ul className="nav-menu">
            <li onClick={() => setNavMenu("shop")}>
                 <Link to="/" style={{textDecoration:"none"}}>Shop</Link>
                {navMenu==="shop"? <hr/> : <></>}
                
            </li>

            {
            localStorage.getItem("auth-token") && isValidUser && (
                <>
                  <li onClick={() => setNavMenu("men")}>
                    <Link to="/mens" style={{ textDecoration: "none" }}>Men</Link>
                    {navMenu === "men" ? <hr /> : null}
                  </li>

                  <li onClick={() => setNavMenu("women")}>
                    <Link to="/womens" style={{ textDecoration: "none" }}>Women</Link>
                    {navMenu === "women" ? <hr /> : null}
                  </li>

                  <li onClick={() => setNavMenu("kids")}>
                    <Link to="/kids" style={{ textDecoration: "none" }}>Kids</Link>
                    {navMenu === "kids" ? <hr /> : null}
                  </li>
                </>
                )
            }

            
        </ul> 



        <div className="nav-login-cart">

            {
            (localStorage.getItem("auth-token") && isValidUser)?
                // make login ....
                <>
                    <button className="btn-login" onClick={handleLogout}>
                        Logout  
                    </button>
                </>
            
            : (   // user as a guest
                <>
                    <Link to="/login">
                        <button 
                            className="btn-login"
                        >Login  
                        </button>
                    </Link>
                </>
            )   
            }
            

            {
            localStorage.getItem("auth-token") && isValidUser &&(
                <>
                    <Link to="/cart">  <img src={cart_icon} alt="cart_icon" />   </Link>
            
                     <div className="nav-cart-count"> {getTotalCartItem()} </div>
                
                </>
                )
            }
           
            
        </div>
       
    </div>
  )
}

export default Navbar;