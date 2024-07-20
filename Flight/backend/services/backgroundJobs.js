const cron = require('node-cron');
const Flight = require('../models/flight');


const generateRandomFlight = () => {
  
  return {
    flightNumber: `FL${Math.floor(Math.random() * 10000)}`,
    origin: 'Airport A',
    destination: 'Airport B',
    scheduledDeparture: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000),
    status: 'Scheduled/En Route',
    airline: 'Airline X'
  };
};

// Generate new flights every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  const newFlight = generateRandomFlight();
  await Flight.create(newFlight);
});

// Update existing flight statuses every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  const flights = await Flight.find();
  flights.forEach(async (flight) => {
    // Implement status update logic
    flight.status = ['Delayed', 'Cancelled', 'In-flight', 'Scheduled/En Route'][Math.floor(Math.random() * 4)];
    await flight.save();
  });
});
