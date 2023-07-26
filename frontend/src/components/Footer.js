import React from 'react';
import '../componentcss/Footer.css';

// Footer contents
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} ConCen Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
