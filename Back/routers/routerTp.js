// routers/userRoutes.js
const express = require('express');
const { getTemperaturePressure } = require('../controllers/controllerTp.js');

const routerTp = express.Router();

routerTp.get('/TemperaturePressure', getTemperaturePressure);

module.exports = routerTp;