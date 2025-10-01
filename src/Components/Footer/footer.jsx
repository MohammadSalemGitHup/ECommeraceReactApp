import React from 'react'

import "./footer.css";

import footor_logo from "../Assets/logo_big.png";
import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">

        {/* <h1>Footer</h1> */}

        <div className="footer-logo">
            <img src={footor_logo} alt="" />
            <p>SHOOPER</p>
        </div>

        <ul className="footer-links">
            <li>About</li>
            <li>Contact</li>
        </ul>

        <div className="footer-social-icons">
            
            <div className="footer-icon-contener-watsApp">
                <a 
                    href="https://wa.me/+970598190021" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    
                >
                <FaWhatsapp className='watsApp-icon'  />
                </a>
            </div>

            <div className="footer-icon-contener-messenger">
                 <a 
                    // this is rh==to open conversation on mohammad salem acount 
                    href="https://www.messenger.com/e2ee/t/24677151518554131" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                <FaFacebookMessenger className="messenger" />
                </a>

            </div>
           
        </div>



        <div className="footer-copyRight">
            <hr />
            © {new Date().getFullYear()} All Rights Reserved
        </div>

    </div>
  )
}

export default Footer