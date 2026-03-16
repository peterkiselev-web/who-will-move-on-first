/**
 * JWT verification helper for serverless functions.
 * Returns the decoded user payload or throws with a .status property.
 */
const jwt = require('jsonwebtoken');

module.exports = function verifyAuth(req) {
  const header = req.headers.authorization;
  if (!header) {
    const err = new Error('No authorization header');
    err.status = 401;
    throw err;
  }
  const token = header.split(' ')[1];
  if (!token) {
    const err = new Error('No token provided');
    err.status = 401;
    throw err;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-in-prod');
  } catch {
    const err = new Error('Invalid or expired token');
    err.status = 401;
    throw err;
  }
};
