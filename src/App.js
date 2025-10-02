

import './App.css';
import { Routes, Route } from 'react-router-dom';
import  Navbar  from "./Components/Navbar/navbar.jsx";
import Shop from "./Pages/Shop/shop.jsx";
import ShopCategory from './Pages/shopCategory.jsx';
import Product from "./Pages/products.jsx";
import Cart from './Pages/cart.jsx';
import LoginSignup from "./Pages/loginSignup/loginSignup.jsx";
import Footer from './Components/Footer/footer.jsx';

import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";



function App() {
  


  //////////////// JSX /////////////////////////////////////
  return (
    <div className="App">

        <Navbar />

        <Routes>
          <Route path="/" element={<Shop />} />

          <Route path="/mens" element={
                                      <ShopCategory 
                                        category="men" 
                                        banner={men_banner}
                                        />} 
          />
          <Route path="/womens" element={<ShopCategory category="women" banner={women_banner} />} />
          <Route path="/kids" element={<ShopCategory category="kid" banner={kids_banner}/>} />

          <Route path='/login' element={<LoginSignup />} />
          
          <Route path='/product' element={<Product />}   >
              <Route path=':productId' element={<Product />} />
          </Route>

          <Route path='/cart' element={<Cart />} />
          


        </Routes>
        <Footer />

    </div>
  );
}

export default App;