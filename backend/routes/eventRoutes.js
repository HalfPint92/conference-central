const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const eventController = require('../controllers/eventController');
const { authorize } = require('../middleware/authorizeMiddleware');

// Event routes
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.put('/click/:id', eventController.updateClickCount);

// Protected routes that require admin access
router.post('/', authMiddleware.authenticate, authorize('admin'), eventController.createEvent);
router.put('/:id', authMiddleware.authenticate, authorize('admin'), eventController.updateEvent);
router.delete('/:id', authMiddleware.authenticate, authorize('admin'), eventController.deleteEvent);

module.exports = router;