import jwt from 'jsonwebtoken';
import config from "../config/index.js";
const { jwtSecret } = config;


const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied. No Bearer token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token Expired' });
    }
    res.status(400).json({ message: 'Invalid Token' });
  }
};

export default authenticateJWT;
