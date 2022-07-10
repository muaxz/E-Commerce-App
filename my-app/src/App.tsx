import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import HomePage from "./pages/Home"
import CartPage from "./pages/DisplayCart"
import Layout from "./layout/layout"
import './App.css';

function App() {
  return (
      <>
        <BrowserRouter>
          <Layout/>
          <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/cart" element={<CartPage/>}/>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
