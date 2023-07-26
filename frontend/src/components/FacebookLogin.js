import React from 'react';
import axios from 'axios';
import '../componentcss/LoginButtons.css';

const FacebookLogin = () => {
  // Function to handle Facebook login
  const handleFacebookLogin = async () => {
    try {
      // Send a GET request to the server to get the Facebook login URL.
      const { data } = await axios.get('http://localhost:5000/api/auth/facebook-login-url');

      // Redirect the user to the obtained Facebook login URL.
      // This will open the Facebook login page in a new tab or redirect the user to Facebook's login page.
      window.location.replace(data.url);
    } catch (error) {
      // If there is an error, log the error to the console.
      console.error(error);
    }
  };

  // The FacebookLogin component renders a button that triggers the Facebook login process when clicked.
  return (
    <button className="facebook-login-button" onClick={handleFacebookLogin}>
      Sign in with Facebook
    </button>
  );
};

export default FacebookLogin;
