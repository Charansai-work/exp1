import { StatusCodes } from 'http-status-codes';
import { logger } from '../utils/logger.js';

export const errorHandler = (err, _req, res, _next) => {
  logger.error(err);
  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || 'Internal server error'
  });
};
