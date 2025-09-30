

import './App.css';
import { Routes, Route } from 'react-router-dom';
import  Navbar  from "./Components/Navbar/navbar.jsx";
import Shop from "./Pages/shop.jsx";
import ShopCategory from './Pages/shopCategory.jsx';
import Product from "./Pages/products.jsx";
import Cart from './Pages/cart.jsx';
import LoginSignup from "./Pages/loginSignup.jsx";


function App() {
  

  //////////////// JSX /////////////////////////////////////
  return (
    <div className="App">

        <Navbar />

        <Routes>
          <Route path="/" element={<Shop />} />

          <Route path="/mens" element={<ShopCategory category="men"/>} />
          <Route path="/womens" element={<ShopCategory category="women"/>} />
          <Route path="/kids" element={<ShopCategory category="kid"/>} />
          
          <Route path='/product' element={<Product />}   >
              <Route path=':productId' element={<Product />} />
          </Route>

          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />



        </Routes>

    </div>
  );
}

export default App;