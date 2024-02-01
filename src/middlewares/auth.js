const auth = require('../utils/auth');

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

module.exports = (req, res, next) => {
  const bearerToken = req.header('Authorization');
  
  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = extractToken(bearerToken);
  
  try {
    const user = auth.verify(token);
    req.locals = { user };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};