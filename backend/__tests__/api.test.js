const connectDB = require('../config/config.js');
const request = require('supertest');
const express = require('express');
const app = express(); // Create a mock Express app

// Import your route handler for getting an event by id from eventController.js
const { getEventById } = require('../controllers/eventController');

// Mock the route handler using the mock Express app
app.get('/api/events/:id', getEventById);

describe('API Tests', () => {
  it('should get an event by id', async () => {
    // Define an example event ID to retrieve
    const eventId = '64ada4e5f965dda942f43c43'; 
    const response = await request(app).get(`/api/events/${eventId}`);
  
    // Assert that the response contains the correct data and status code
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(eventId);
  }, 20000); // Increase the timeout to 20000ms (20 seconds)
});

beforeAll(async () => {
  await connectDB(); // Connect to the MongoDB database
});
