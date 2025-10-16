import React from 'react'

import "./productDescriptionBox.css";

const ProductDescriptionBox = (props) => {

    const product_description = props.description;

  return (
    <div className='productDescriptionBox'>
        
        <article> 
            Product description :{ product_description }
        </article>
    </div>
  )
}

export default ProductDescriptionBox;