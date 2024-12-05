

const jwt = require('jsonwebtoken')


const authMiddleware = (req, res, next) => {
    console.log(req,'REQUEST')
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Authorization denied.'
      });
    }
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'YOUR_SECRET_KEY');
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token has expired. Please log in again.'
        });
      }
  
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. Authorization denied.'
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Server error during token verification.'
      });
    }
  };
  
  module.exports = authMiddleware;