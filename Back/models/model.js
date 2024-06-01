// models/User.js
const mongoose = require('mongoose');

// Define the schema for the temperature and pressure data
const AquaStateSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  temp: {
    type: Number,
    required: true,
  },
  pressure: {
    type: Number,
    required: true,
  },
});

// Create the model for temperature and pressure data
const AquaState = mongoose.model('AquaState', AquaStateSchema);

// Define the schema for user data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Create a model for user data
const User = mongoose.model('User', userSchema);

// Function to fetch and format temperature and pressure data
function fetchAquaStateData(callback) {
  AquaState.find({}, (err, data) => {
    if (err) {
      console.error('Error fetching data from MongoDB:', err);
      // Handle error
      callback(err);
      return;
    }

    // Map MongoDB documents to match the columns configuration
    const formattedData = data.map(item => ({
      id: item._id, // Assuming _id is available in your MongoDB documents
      date: item.date,
      timestamp: item.timestamp,
      temperature: item.temp,
      pressure: item.pressure,
    }));

    // Pass formatted data to the callback
    callback(null, formattedData);
  });
}

module.exports = { User, AquaState, fetchAquaStateData };