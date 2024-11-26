import jwt from 'jsonwebtoken';
import config from "../config/index.js";
const { jwtSecret } = config;

// TODO Need TO once AUTH flow completed
const payload = {
  userId: '12345',
  email: 'user@example.com',
};
const options = {
  expiresIn: '1h',
};

export const getToken = async (req, res) => {
  try {
    const token = jwt.sign(payload, jwtSecret, options);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
