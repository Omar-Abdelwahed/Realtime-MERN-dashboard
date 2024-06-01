const AquaStats = require('../models/model');

// Controller function to handle the incoming data
exports.postRealtimeData = async (req, res) => {
    const { temperature, pressure, time, } = req.body;

    if (!temperature || !pressure) {
        return res.status(400).json({ error: 'Temperature and Pressure are required' });
    }

    try {
        const newData = new AquaStats({ temperature, pressure, time, date });
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
};
