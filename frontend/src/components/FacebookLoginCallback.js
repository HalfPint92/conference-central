import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FacebookLoginCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the query parameters from the URL
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    // Send the authorization code to the backend for token exchange
    const handleFacebookLogin = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/facebook-login-callback?code=${code}`
        );

        // backend sends back the JWT token
        const { token, role } = response.data;

        // Save the token and role in local storage or state
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        // Redirect  after successful login
        navigate('/');
      } catch (error) {
        console.error('Facebook login callback error:', error);
        
        navigate('/login'); // Redirect to the login page if the login fails
      }
    };

    handleFacebookLogin();
  }, [location, navigate]);

  return (
    <div>
      <p>Processing Facebook login...</p>
    </div>
  );
};

export default FacebookLoginCallback;
