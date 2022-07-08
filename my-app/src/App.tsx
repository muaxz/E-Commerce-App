import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import HomePage from "./pages/Home"
import Layout from "./layout/layout"
import './App.css';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<div>about</div>}/>
        </Routes>
      </BrowserRouter>
    </Layout>
   
  );
}

export default App;
