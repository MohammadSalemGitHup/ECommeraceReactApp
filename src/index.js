import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

import MohsalShopContextProvider from './Context/shopContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>

      <MohsalShopContextProvider>  {/* wrapping */}
        <App />
      </MohsalShopContextProvider>
      
      
    </BrowserRouter>
  </React.StrictMode>
);

