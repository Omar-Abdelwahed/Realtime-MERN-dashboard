// routers/userRoutes.js
const express = require('express');
const { getAquaState } = require('../controllers/controllerAquaStats.js');

const routerAquaStats = express.Router();

routerAquaStats.get('/AquaState', getAquaState);

module.exports = routerAquaStats;