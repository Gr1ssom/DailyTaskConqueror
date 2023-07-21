// auth.js
const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');

    // Attach the user object to the request for further use in protected routes
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = authMiddleware;
