const jwt = require('jsonwebtoken');
const User = require("../models/User");

const authMiddleware = (requiredRoles = []) => {
  return async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Not authorized, no token' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied, insufficient role' });
      }

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const refreshToken = req.headers['x-refresh-token'];
        if (!refreshToken) {
          return res.status(401).json({ error: 'Not authorized, no refresh token' });
        }
        try {
          const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
          req.user = await User.findById(decodedRefresh.id).select('-password');

          const newAccessToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
          });

          res.set('x-access-token', newAccessToken);
          next();
        } catch (refreshError) {
          return res.status(401).json({ error: 'Not authorized, refresh token failed' });
        }
      } else {
        return res.status(401).json({ error: 'Not authorized, token failed' });
      }
    }
  };
};

module.exports = authMiddleware;