import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GalleryPage from "./pages/GalleryPage";
import GoogleLoginCallback from "./components/GoogleLoginCallback";

const App = () => {
  // State variables to track the user's login status and role
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has a valid token and role in localStorage on component mount
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  // Function to handle user login
  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      const { role } = response.data;

      setIsLoggedIn(true);
      setUserRole(role);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.clear();
  };

  // Function to handle user registration
  const handleRegister = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData
      );
      console.log("User registered!");

      const { username, password } = userData;
      await handleLogin({ username, password });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle "Gallery" button click, redirects to the GalleryPage
  const handleGalleryClick = () => {
    navigate("/gallery");
  };

  return (
    <>
      {/* Navbar component with login status and logout function */}
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        isAdmin={userRole === "admin"}
      />

      <Routes>
        {/* Define routes for different pages */}
        <Route
          path="/"
          element={<HomePage handleGalleryClick={handleGalleryClick} />}
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/login"
          element={<LoginPage handleLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<RegisterPage handleRegister={handleRegister} />}
        />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/login/callback" element={<GoogleLoginCallback />} />
      </Routes>
      {/* Footer component */}
      <Footer />
    </>
  );
};

export default App;
