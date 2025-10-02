import React from 'react'

import "./item.css";

const Item = (props) => {
  return (
    
    <div className="item">
        {/* <h1>Hi in item</h1>
        <p>hiiii</p> */}

        <img src={props.image} alt="" />
        <p> {props.name} </p>
        <div className="item-price">
          <div className="item-price-new">
            { props.new_price }
          </div>
          <div className="item-price-old">
            { props.old_price }
          </div>
        </div>


    </div>
  )
}

export default Item;