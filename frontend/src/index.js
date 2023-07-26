import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap the App with GoogleOAuthProvider */}
    <GoogleOAuthProvider clientId="417906668592-c4ut0h7tuv3a8eopiim7vr9l1rpudp9n.apps.googleusercontent.com">
      <Router>
        <App />
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
