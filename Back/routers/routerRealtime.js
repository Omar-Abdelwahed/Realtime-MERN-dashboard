const express = require('express');
const router = express.Router();

// Temporary in-memory storage
let dataStorage = [];

// Route to handle incoming real-time data
router.post('/realtime', (req, res) => {
    const { date, time, temperature, pressure } = req.body;

    if (!date || !time || typeof temperature === 'undefined' || typeof pressure === 'undefined') {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const newData = { date, time, temperature, pressure };
    dataStorage.push(newData);
    res.status(201).json(newData);
});

// Route to get all real-time data
router.get('/realtime', (req, res) => {
    res.json(dataStorage);
});

module.exports = router;
