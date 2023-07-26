import React, { useState } from 'react';

// The AuthForm component is a reusable form for user authentication (login and registration).
const AuthForm = ({ handleSubmit, isRegister }) => {
  // Define state variables for username and password fields using React's useState hook.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Event handler for changes in the username input field.
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Event handler for changes in the password input field.
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Event handler for form submission.
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior.

    // Call the handleSubmit function (passed as a prop from the parent component) with the entered username and password.
    handleSubmit(username, password);
  };

  // The AuthForm renders a form with two input fields for username and password, and a submit button.
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        {/* Label and input field for username */}
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        {/* Label and input field for password */}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      {/* Submit button with dynamic text based on the isRegister prop */}
      <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;
