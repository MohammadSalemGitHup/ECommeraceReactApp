import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"

import logo_src from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"

const Navbar = (  ) => {

    // state (change the hr under Shop, Men, Women, Kids)
    const [navMenu, setNavMenu] = useState("");



  return (
    <div className='navbar'>
        
        <div className="nav-logo">
            <img src={logo_src} alt="nav-logo" />
            <p>Shooper</p>
        </div>

       <ul className="nav-menu">
            <li onClick={() => setNavMenu("shop")}>
                 <Link to="/" style={{textDecoration:"none"}}>Shop</Link>
                {navMenu==="shop"? <hr/> : <></>}
                
            </li>
            <li onClick={() => setNavMenu("men")}>
                <Link to="/mens" style={{textDecoration:"none"}}>Men</Link>
                {navMenu==="men"? <hr/> : <></>} 
            </li>
            <li onClick={() => setNavMenu("women")}>
                <Link to="/womens" style={{textDecoration:"none"}} >Women</Link>
                {navMenu==="women"? <hr/> : <></>}
            </li>
            <li onClick={() => setNavMenu("kids")}>
                <Link to="/kids" style={{textDecoration:"none"}}>kids</Link>
                {navMenu==="kids"? <hr/> : <></>}
            </li>
        </ul> 



        <div className="nav-login-cart">

            <Link to="/login">
                 <button 
                    className="btn-login"
                >
                Login
                </button>
            
            </Link>
           
            <Link to="/cart">  <img src={cart_icon} alt="cart_icon" />   </Link>
            
            <div className="nav-cart-count">0</div>
        </div>
       
    </div>
  )
}

export default Navbar;