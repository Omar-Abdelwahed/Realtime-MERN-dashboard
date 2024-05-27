// app.js or index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routers/router');
const routerTp = require('./routers/routerTp.js');

const app = express();
const PORT = process.env.PORT || 3100;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/AquaFarm', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// Middleware: You need to call these functions to initialize them
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', routerTp);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
