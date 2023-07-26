import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../pagecss/LoginPage.css";
import GoogleLogin from "../components/GoogleLogin";
import FacebookLogin from "../components/FacebookLogin";

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoginUrl, setGoogleLoginUrl] = useState("");
  const [googleLoginError, setGoogleLoginError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the Google login URL from your backend
    const fetchGoogleLoginUrl = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/google-login-url"
        );
        setGoogleLoginUrl(response.data.url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoogleLoginUrl();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ username, password });

    // Redirect the user to the homepage after successful login
    navigate("/");
  };

  const redirectToGoogleLogin = () => {
    if (googleLoginUrl) {
      // Redirect to the new Google login callback route
      window.location.href = `${googleLoginUrl}&redirect_uri=http://localhost:5000/api/auth/google-login-callback`;
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login error:", error);
    setGoogleLoginError("Google login failed. Please try again.");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {/* Use the GoogleLogin and FacebookLogin components */}
      <GoogleLogin />
      <FacebookLogin />

      {/* Display Google login errors */}
      {googleLoginError && <p>{googleLoginError}</p>}

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
