const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');

// Function to register a new user
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Set the default role value if no role is provided
    const userRole = role || 'user';

    // Create a new user with the provided username, password, and role
    const newUser = new User({ username, password, role: userRole });
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to handle user login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the provided password matches the user's password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token containing the user ID and role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'secretkey',
      { expiresIn: '1h' } // Token expiration time
    );

    // Respond with the token and the user's role
    res.status(200).json({ token, role: user.role });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to get the role of a user
const getUserRole = async (req, res) => {
  try {
    // Find the user by their ID 
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user's role
    return res.status(200).json({ role: user.role });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to generate the Google login URL for the frontend
const getGoogleLoginUrl = (req, res) => {
  try {
    // Create a new instance of the Google OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      '417906668592-c4ut0h7tuv3a8eopiim7vr9l1rpudp9n.apps.googleusercontent.com',
      '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',
      'http://localhost:3000/login/callback'
    );

    // Generate the URL for Google login with requested scopes
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline', // Request offline access to get refresh token
      scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'], // Request access to profile and email information
    });

    // Respond with the Google login URL
    res.json({ url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to handle the Google login callback and generate a JWT token
const getGoogleLoginCallback = async (req, res) => {
  try {
    console.log('Received Google login callback request');

    // Get the authorization code from the query parameters
    const { code } = req.query;

    // Create an OAuth2 client instance
    const oauth2Client = new google.auth.OAuth2(
      '417906668592-c4ut0h7tuv3a8eopiim7vr9l1rpudp9n.apps.googleusercontent.com',
      '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',
      'http://localhost:3000/login/callback'
    );

    // Exchange the authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);

    // Get the user's profile information using the access token
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();

    // Assuming you have a user ID and role in your database, you can create a JWT token with them
    const token = jwt.sign(
      { userId: 'yourUserIdHere', role: 'user' },
      'secretkey',
      { expiresIn: '1h' } // Token expiration time
    );

    // Respond with the generated token and role
    res.status(200).json({ token, role: 'user' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to generate the Facebook login URL for the frontend
const getFacebookLoginUrl = (req, res) => {
  try {
    console.log('getFacebookLoginUrl function accessed');

    const facebookAppId = '222595637420980';
    const redirectUri = 'http://localhost:3000/login/facebook/callback';
    const url = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${facebookAppId}&redirect_uri=${redirectUri}&scope=email`;

    // Respond with the Facebook login URL
    res.json({ url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to handle the Facebook login callback and generate a JWT token
const getFacebookLoginCallback = async (req, res) => {
  try {
    console.log('Received Facebook login callback request');

    // Get the authorization code from the query parameters
    const { code } = req.query;

    // Your Facebook App ID and App Secret
    const facebookAppId = '222595637420980';
    const facebookAppSecret = '80a74903201dc3431ca6aeb6f614b19a';
    const redirectUri = 'http://localhost:3000/login/facebook/callback';

    // Exchange the authorization code for an access token
    const accessTokenResponse = await axios.get(
      `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${facebookAppId}&client_secret=${facebookAppSecret}&code=${code}&redirect_uri=${redirectUri}`
    );

    const accessToken = accessTokenResponse.data.access_token;

    // Use the access token to get the user's profile information
    const profileResponse = await axios.get(
      `https://graph.facebook.com/me?fields=id,email&access_token=${accessToken}`
    );

    const { id, email } = profileResponse.data;

    // Check if the user already exists in your database
    let user = await User.findOne({ facebookId: id });

    if (!user) {
      // If the user does not exist, create a new user in your database
      user = new User({ username: email, facebookId: id });
      await user.save();
    }

    // Generate a JWT token with user ID and role
    const token = jwt.sign(
      { userId: user._id, role: 'user' },
      'secretkey',
      { expiresIn: '1h' } // Token expiration time
    );

    // Respond with the generated token and role
    res.status(200).json({ token, role: 'user' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login,
  getUserRole,
  getGoogleLoginUrl,
  getGoogleLoginCallback,
  getFacebookLoginUrl,
  getFacebookLoginCallback,
};
