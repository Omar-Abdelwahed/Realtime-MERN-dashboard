const {TemperaturePressure} = require('../models/model.js');

const getTemperaturePressure = async (req, res) => {
  try {
    const data = await TemperaturePressure.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTemperaturePressure };