
import React from 'react'

import "./breadcrumbs.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrumbs = (props) => {

    const { product } = props;

    // this condition is important it is wait... to get data From Context
    if (!product) {
      console.log("From Breadcrumbs: wait.... to get data From Context ....");
      return null; 
    }

  return (
    <div className='breadcrumbs'>

            Home <img src={arrow_icon} alt="" /> 
            Shop <img src={arrow_icon} alt="" />  
            {product.category} <img src={arrow_icon} alt="" /> {product.name }
    
        
    </div>
  )
}

export default Breadcrumbs