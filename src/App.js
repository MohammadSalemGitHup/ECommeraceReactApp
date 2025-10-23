

import './App.css';
import { Routes, Route } from 'react-router-dom';
import  Navbar  from "./Components/Navbar/navbar.jsx";
import Shop from "./Pages/Shop/shop.jsx";
import ShopCategory from './Pages/ShopCategory/shopCategory.jsx';
import Product from "./Pages/Product/product.jsx";
import Cart from './Pages/cart.jsx';
import LoginSignup from "./Pages/loginSignup/loginSignup.jsx";
import Payment from "./Pages/Payment/payment.jsx"
import Footer from './Components/Footer/footer.jsx';

import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";

import RequireAuth from "./Components/RequireAuth.jsx";


function App() {
  


  //////////////// JSX /////////////////////////////////////
  return (
    <div className="App">

        <Navbar />

        <Routes>
          <Route path="/" element={<Shop />} />

          <Route path="/mens" element={
                                      <RequireAuth>
                                        <ShopCategory category="man"  banner={men_banner}/>
                                      </RequireAuth>   
                                      } 
          />



          <Route path="/womens" element={
            <RequireAuth>
              <ShopCategory category="women" banner={women_banner} />
            </RequireAuth>
            } 
          />
          <Route path="/kids" element={
            <RequireAuth>
              <ShopCategory category="kids" banner={kids_banner}/>
            </RequireAuth>
            } 
          />

          <Route path='/login' element={<LoginSignup />} />
          
          <Route path='/product' element={<RequireAuth>   <Product />   </RequireAuth>}   >
              <Route path=':productId' element={<Product />} />
          </Route>

          <Route path='/cart' element={<RequireAuth>   <Cart />  </RequireAuth>} />

          <Route path='/payment' element={<RequireAuth>   <Payment />  </RequireAuth>} />

          


        </Routes>
        <Footer />

    </div>
  );
}

export default App;