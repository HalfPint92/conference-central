const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Apply Helmet middleware for enhanced security
app.use(helmet());

// Enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // Check if the routes are registered correctly
  app._router.stack.forEach((route) => {
    if (route.route && route.route.path) {
      console.log(`Registered route: ${route.route.path}`);
    }
  });
});