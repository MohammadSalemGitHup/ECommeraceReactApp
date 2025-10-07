
import "./productDisplay.css" ;


import { MohsalShopContext } from "../../Context/shopContext";
import { useContext } from "react";

const ProductDisplay = (props) => {

    const { product } = props;

    const { addToCart }  = useContext(MohsalShopContext);


    /////// JSX ////////
  return (
    <div className='ProductDisplay'>

         {/* ////////Screen Left//////// */}
       
        <div className="productDispaly-left">
            <div className="image-display-image-left">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>

            <div className="display-main-image">
                <img className="display-main-image-productImge" src={product.image} alt="" />
            </div>
        </div>


        {/* ////////Screen Right//////// */}

        <div className="productDispaly-right">
            <h1> {product.name} </h1>

            <div className="product-prices">
                <div className="old-price"> {product.old_price}    </div>
                <div className="new-price"> {product.new_price}    </div>
            </div>

            <div className="product-sizes">
                <h1>Select Size</h1>
                <div className="size-levels">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
                <button onClick={ () => addToCart(product.id) }>Add To Cart</button>
            </div> 

        </div>


    </div>
  )
}

export default ProductDisplay;