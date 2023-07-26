const BASE_URL = "http://localhost:5000/api";

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  // Check if a token is present in local storage or cookies
  const token = localStorage.getItem("token");

  // Return true if a token exists, indicating that the user is authenticated
  return !!token;
};

// Function to handle user login
export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const { token } = data;
      localStorage.setItem("token", token);
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to handle user signup
export const signup = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      console.log("User signed up successfully!");
    } else {
      throw new Error("Signup failed");
    }
  } catch (error) {
    console.error(error);
    // Handle signup error, such as displaying an error message to the user
  }
};

// Function to handle user logout
export const logout = () => {
  // Clear the token from local storage or cookies
  localStorage.removeItem("token");
};

// Function to get the current user's role
export const getCurrentUserRole = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/user/role`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.role; // the role is returned as a property named 'role' in the response data
    } else {
      throw new Error("Failed to get user role");
    }
  } catch (error) {
    console.error(error);
  }
};
