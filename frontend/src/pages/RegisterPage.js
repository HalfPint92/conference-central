import React, { useState } from "react";
import "../pagecss/RegisterPage.css";

const RegisterPage = ({ handleRegister }) => {
  // State variables to store the username and password entered by the user
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle the form submission when the user clicks the "Register" button
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the 'handleRegister' function passed as a prop from the parent component with the username and password as arguments
    handleRegister({ username, password });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Input field for the username */}
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update the 'username' state when the user types in the input field
            required
          />
        </div>
        {/* Input field for the password */}
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update the 'password' state when the user types in the input field
            required
          />
        </div>
        {/* Button to submit the form */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
