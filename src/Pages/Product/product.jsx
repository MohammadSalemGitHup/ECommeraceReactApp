

import "./product.css"
import { useContext, useEffect, useState } from "react";
import { MohsalShopContext } from '../../Context/shopContext';
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../Components/Breadcrumbs/breadcrumbs";
import ProductDisplay from "../../Components/ProductDisplay/productDisplay";
import ProductDescriptionBox from "../../Components/ProductDescriptionBox/productDescriptionBox";


const Product = (props) => {

   // Context consumer
  const  { allProducts } = useContext(MohsalShopContext); //get data as the same name from Context
  const products = allProducts; // Extract array 
  // console.log(`The products on Product Component is:\n`);
  // console.log(products);

  const { productId } = useParams(); // deconstruct the productId in Route
   

  const [product, setProduct] = useState(null);
  // Find the product after data is loaded
  useEffect(() => {
  if (products.length > 0) {
    const foundProduct = products.find(
      (prod) => Number(prod.id) === Number(productId)
    );
    setProduct(foundProduct || null);
    if (foundProduct) {
      console.log("The Product is :", foundProduct);
    } else {
      console.log("Product not found");
    }
  }
}, [products, productId]);


// ✅ Handle null product safely
const description = product?.description 
  ? String(product.description)
  : "There is no product description";

  setTimeout(()=>{},3000);


  //// JSX ////////////
  return (
    <div className='product'>
        {/* <h1>Hi in Product</h1> */}

       <Breadcrumbs product={product}/>
       <ProductDisplay product={product}/>
       <ProductDescriptionBox description={description}/>
    </div>
  )
}

export default Product;