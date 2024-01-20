const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token)
    return res.status(401).json({
      message: 'No authentication token, authorization denied',
      status: false,
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid Token', status: false });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token', status: false });
  }
};

module.exports = verifyToken;
