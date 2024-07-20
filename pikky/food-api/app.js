// app.js
const express = require('express');
const app = express();
const foodRoutes = require('./routes/foodRoutes');

app.use(express.json());
app.use('/api/food', foodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
