const mongoose = require("mongoose");

// Connection URL
const mongoURI = 'mongodb://localhost:27017/ethiobus';
// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });