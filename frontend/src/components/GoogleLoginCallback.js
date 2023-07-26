import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleLoginCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the query parameters from the URL
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    // Check if the auth code exists before proceeding
    if (!code) {
      console.error('Authorization code not found in URL');
      navigate('/login'); // Redirect to login page if the code is missing
      return;
    }

    // Send the authorization code to the backend for token exchange
    const handleGoogleLogin = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/google-login-callback?code=${code}`
        );

        // backend sends back the JWT token
        const { token, role } = response.data;

        // Save the token and role in local storage or state
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        // Redirect to the desired location after successful login
        navigate('/');
      } catch (error) {
        console.error('Google login callback error:', error);
        
        navigate('/login'); // Redirect to login page if the login fails
      }
    };

    handleGoogleLogin();
  }, [location, navigate]);

  return (
    <div>
      <p>Processing Google login...</p>
    </div>
  );
};

export default GoogleLoginCallback;
