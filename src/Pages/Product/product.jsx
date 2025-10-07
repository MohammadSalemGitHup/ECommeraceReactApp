

import "./product.css"
import { useContext } from "react";
import { MohsalShopContext } from '../../Context/shopContext';
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../Components/Breadcrumbs/breadcrumbs";
import ProductDisplay from "../../Components/ProductDisplay/productDisplay";
import ProductDescriptionBox from "../../Components/ProductDescriptionBox/productDescriptionBox";


const Product = (props) => {

   // Context consumer
  const  { all_product } = useContext(MohsalShopContext); 
  const products = all_product; // Extract array 

  

  

  const { productId } = useParams(); // deconstruct the productId in Route 


  const product = products.find ( (prod) => prod.id === Number(productId)  );
  // console.log(product);

  ////// product descreption /////
  let descreption = "";
  if(product.descreption){
    descreption = product.descreption;
  }
  else{
    descreption = "There is No Product Description";
  }
  
  

  return (
    <div className='product'>
        {/* <h1>Hi in Product</h1> */}

       <Breadcrumbs product={product}/>
       <ProductDisplay product={product}/>
       <ProductDescriptionBox descreption={descreption}/>
    </div>
  )
}

export default Product;