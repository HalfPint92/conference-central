import React from 'react';
import { Link } from 'react-router-dom';
import '../componentcss/Navbar.css';


// Navbar content
const Navbar = ({ isLoggedIn, handleLogout, isAdmin }) => {
  return (
    <nav className="navbar">
      <div className="logo">
      <img src="/logo.png" alt="logo" />
        <h1>ConferenceCentral</h1>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-button">Home</Link>
        </li>
        {isLoggedIn && isAdmin && (
          <li>
            <Link to="/admin" className="nav-button">Admin</Link>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className="nav-button">Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" className="nav-button">Login</Link>
            </li>
            <li>
              <Link to="/register" className="nav-button">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
