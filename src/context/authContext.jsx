import React, { createContext, useContext, useState } from "react";
import API from "../services/api"; // Fixed path - removed .js extension

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // SIGNUP
  const signup = async (name, email, password, phone) => {
    try {
      const response = await API.post('/auth/signup', { name, email, password, phone });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      console.error("Signup error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Signup failed. Please try again.' 
      };
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        return {
          success: true,
          message: "Login successful",
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Login failed",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}