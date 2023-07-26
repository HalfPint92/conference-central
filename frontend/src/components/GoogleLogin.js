import React from 'react';
import axios from 'axios';
import '../componentcss/LoginButtons.css';

const GoogleLogin = () => {
  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Send a GET request to the server to get the Google login URL.
      const { data } = await axios.get('http://localhost:5000/api/auth/google-login-url');

      // Redirect the user to the obtained Google login URL.
      // This will open the Google login page in a new tab or redirect the user to Google's login page.
      window.location.replace(data.url);
    } catch (error) {
      
      console.error(error);
    }
  };

  // The GoogleLogin component renders a button with Google's logo that triggers the Google login process when clicked.
  return (
    <button className="google-login-button" onClick={handleGoogleLogin}>
      
      <img src={`${process.env.PUBLIC_URL}/images/google-icon.jpg`} alt="Google Icon" />
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
