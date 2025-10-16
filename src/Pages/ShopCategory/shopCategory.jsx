import React, { useContext } from 'react'

import "./shopCategory.css";
import { MohsalShopContext } from '../../Context/shopContext';
import dropDown_icon from "../../Components/Assets/dropdown_icon.png";
import Item from "../../Components/Item/item";

const ShopCategory = ( props ) => {

  // Context consumer
  const { allProducts } = useContext(MohsalShopContext);  //get data as the same name from Context
  const products =  allProducts; // Extract array 
  console.log(Array.isArray(products), products?.length); 
  

  /////// JSX //////////////
  return (
    
    <div className="shop-category">
      
      <img className="shop-category-banner" src={props.banner} alt="" />

      <div className="shop-category-index-sort">
        <p> <span>showing 1-12</span> out of 36 Products</p>
      

        <div className='shoopcategory-sort'>
          
          Sort by <img src={dropDown_icon} alt=""/>
          
          
        </div>

      </div>


      {/* display products */}
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


      {/* load more */}
      <div className="shopcategory-loadmore" >

        Explore More
         
      </div>

    </div>
  )
}

export default ShopCategory;