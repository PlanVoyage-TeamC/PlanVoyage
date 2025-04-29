import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const createToken = (id) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is undefined!');
  }

  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

// Sign up route
router.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ firstname, lastname, email, password });
    const token = createToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    console.error("Error during sign up:", err);
    res.status(500).json({ error: 'Server error during sign up' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = createToken(user._id);
    console.log("JWT_SECRET in createToken:", process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

export default router;
