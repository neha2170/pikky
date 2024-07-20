const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  scheduledDeparture: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Delayed', 'Cancelled', 'In-flight', 'Scheduled/En Route'], 
    default: 'Scheduled/En Route' 
  },
  airline: { type: String }
});

module.exports = mongoose.model('Flight', flightSchema);
