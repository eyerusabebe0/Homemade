import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import User from './dashbords/User';
import Admin from './dashbords/Admin';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductList />} />
        <Route path="/dashboard" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;