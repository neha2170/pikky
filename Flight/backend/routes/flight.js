const express = require('express');
const router = express.Router();
const {addFlight, getAllFlights, updateFlightStatus ,addFlightStatus, getAllStatus} = require('../controllers/flight');
const { authMiddleware } = require('../middlewares/auth');

// Middleware to protect routes
router.use(authMiddleware);

//Route to add flight
router.post('/flight', addFlight);
// Route to get all flights
router.get('/flights', getAllFlights);

//Route to add flight status
router.post('/flight/status', addFlightStatus)

//Route to get all flight status
router.get('/flight/status', getAllStatus)

// Route to update flight status
router.put('/flights/:id/status', updateFlightStatus);

module.exports = router;
