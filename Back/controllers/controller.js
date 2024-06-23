// controllers/userController.js
const { User } = require("../models/model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        ...req.body,
        password: hashedPass,
        createdBy: req.userId,
      });
      const result = await newUser.save();
      res.status(201).send({
        message: "User created successfully",
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error hashing password",
        error,
      });
    }
  },
  login: async (req, res) => {
    try {
      // Find user by email
      const result = await User.findOne({ email: req.body.email });
      console.log("result: ", result);
      if (!result) {
        return res.status(404).send({
          message: 'User not found'
        });
      }

      // Compare password
      const passChecked = await bcrypt.compare(req.body.password, result.password);
      
      if (!passChecked) {
        return res.status(403).send({
          message: 'Wrong password'
        });
      }

      // Create token
      const secretKey = "mySuperSecretKey123!@#"
      const token = jwt.sign(
        {
          userId: result._id,
          email: result.email
        },
        secretKey, // 123 hya secret key .env inchallah mawjouda okht'ha fel auth middleware
        { expiresIn: "24h" }
      );

      // Send response
      res.status(200).json({
        message: "Token created successfully",
        token: token
      });
    } catch (error) {
      console.error(error);
      res.status(400).send({
        message: "Cannot generate a token",
        error
      });
    }
  },
  getOne: async (req, res) => {
    try {
      // Find user by ID
      const user = await User.findById(req.userId);
      
      if (!user) {
        return res.status(404).send({
          message: 'User not found'
        });
      }

      // Send response
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(400).send({
        message: 'You need to authenticate',
        error: error
      });
    }
  }
};

