const User = require('../models/user');
const Role = require("../models/role")

// Register new user
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addRole = async (req, res) => {
    const { name} = req.body;
    try {
      const role = await Role.create({ name });
      
      res.json({ role });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getAllRoles = async (req, res) => {
    try {
      const role = await Role.find();
    
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
