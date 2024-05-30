// app.js or index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routers/router');
const routerAquaStats = require('./routers/routerAquaStats.js');

const app = express();
const PORT = process.env.PORT || 3100;

// l steps taa MongoDB connection
mongoose.connect('mongodb://localhost:27017/AquaFarm', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// Middleware
app.use(cors());
app.use(express.json());

// routes: wahda lel users w wahda lel aquadata
app.use('/api', userRoutes);
app.use('/api', routerAquaStats);

// besmelleh:
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
