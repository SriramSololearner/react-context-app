import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './Components/ProductsList/Landing';
import ShoppingCart from './Components/Cart/ShoppingCart';
import Header from './Components/Header/Header';

function App() {



  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/cart' element={<ShoppingCart />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
