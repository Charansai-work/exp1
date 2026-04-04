import { StatusCodes } from 'http-status-codes';
import { verifyAccessToken } from '../utils/tokens.js';

export const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }
  try {
    req.user = verifyAccessToken(header.split(' ')[1]);
    return next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  }
  return next();
};
