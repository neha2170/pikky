const Flight = require('../models/flight');
const Status = require("../models/status")
// Add a new flight
exports.addFlight = async (req, res) => {
  const { flightNumber, origin, destination, scheduledDeparture, status, airline } = req.body;

  // Validate status value
  const validStatuses = ['Delayed', 'Cancelled', 'In-flight', 'Scheduled/En Route'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const newFlight = new Flight({
      flightNumber,
      origin,
      destination,
      scheduledDeparture,
      status: status || 'Scheduled/En Route', // Default status if not provided
      airline
    });

    const savedFlight = await newFlight.save();
    res.status(201).json(savedFlight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addFlightStatus= async (req, res) => {
  const { name} = req.body;
  try {
    const status = await Status.create({ name });
    
    res.json({ status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllStatus= async (req, res) => {
  try {
    const status = await Status.find();
    res.json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update flight status
exports.updateFlightStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const flight = await Flight.findByIdAndUpdate(id, { status }, { new: true });
    if (!flight) return res.status(404).json({ message: 'Flight not found' });
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
