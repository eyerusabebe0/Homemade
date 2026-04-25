
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import UserDashboard from './dashboards/UserDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              } />
              <Route path="/add-product" element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              } />
              <Route path="/admin" element={
                <PrivateRoute adminOnly>
                  <AdminDashboard />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;