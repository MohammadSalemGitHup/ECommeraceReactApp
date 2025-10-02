import React, { useContext } from 'react'

import "./CSS/shopCategory.css";
import { MohsalShopContext } from '../Context/shopContext';
import dropDown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/item";

const ShopCategory = (props) => {

  // Context consumer
  const products = useContext(MohsalShopContext); // this is the array of all data
  // console.log(Array.isArray(products), products?.length); 
  
  

  return (
    
    <div className="shop-category">
      
      <img src={props.banner} alt="" />

      <div className="shop-category-index-sort">
        <p> <span>showing 1-12</span> out of 36 Products</p>
      </div>

      <div className='shoopcategory-sory'>
        <img src={dropDown_icon} alt="" />
      </div>

      <div className="shopcategory-products">

        {
          products.map( (item, i) => {
            if(item.category === props.category){
              return <Item key={i} 
                           id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price}/> ;
            }
            else{
            
              return  [];
            }

          })
        }
      </div>

    </div>
  )
}

export default ShopCategory;