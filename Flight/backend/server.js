const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
const flightRoutes = require('./routes/flight');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
require('dotenv').config();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(cors());
// Routes
app.use('/api', authRoutes);
app.use('/api', flightRoutes);


// Error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Import background jobs
require('./services/backgroundJobs');
