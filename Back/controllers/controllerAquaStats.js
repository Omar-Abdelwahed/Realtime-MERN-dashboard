const {AquaState} = require('../models/model.js');

const getAquaState = async (req, res) => {
  try {
    const data = await AquaState.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAquaState };