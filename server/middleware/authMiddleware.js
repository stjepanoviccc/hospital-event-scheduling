const jwt = require('jsonwebtoken');
const User = require("../models/User");

const authMiddleware = (requiredRoles = []) => {
  return async (req, res, next) => {
    console.log('Authorization header:', req.headers.authorization); 
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Not authorized, no token' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({ email: decoded.email }).select('-password');

      if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied, insufficient role' });
      }

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.log(req.headers)
        const refreshToken = req.headers['x-refresh-token'];
        if (!refreshToken) {
          return res.status(401).json({ error: 'Not authorized, no refresh token' });
        }
        try {
          const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
          const user = await User.findOne({ email: decodedRefresh.email }).select('-password');

          const newAccessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
          });
          const newRefreshToken = jwt.sign({ email: user.email }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRE,
          })

          res.set('x-access-token', newAccessToken);
          res.set('x-refresh-token', newRefreshToken);
          next();
        } catch (refreshError) {
          return res.status(401).json({ error: 'Not authorized, refresh token failed' });
        }
      } else {
        console.log(error);
        return res.status(401).json({ error: 'Not authorized, token failed' });
      }
    }
  };
};

module.exports = authMiddleware;