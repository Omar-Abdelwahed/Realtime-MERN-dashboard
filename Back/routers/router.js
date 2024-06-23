// routers/userRoutes.js
const express = require('express');
const { register,login,getOne } = require('../controllers/controller');
const authmiddleware = require("../middleWare/authMiddleware")
const router = express.Router();

router.post('/register', register );
router.post('/login', login );
router.post('/getOne',authmiddleware, getOne );


module.exports = router;