const AquaStats = require('../models/model');

// Controller function to handle the incoming data
exports.postRealtimeData = async (req, res) => {
    const { temp, pressure } = req.body;

    if (!temp || !pressure) {
        return res.status(400).json({ error: 'Temp and Pressure are required' });
    }

    try {
        const newData = new AquaStats({ temp, pressure, timestamp: new Date() });
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
};
