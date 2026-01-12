import type { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/httpError.js';

/**
 * Global error handling middleware
 * Catches errors and sends appropriate HTTP responses
 */
export function errorHandler(
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Handle HttpError instances
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        statusCode: err.statusCode,
        ...(err.details && { details: err.details }),
      },
    });
    return;
  }

  // Handle unexpected errors
  console.error('Unexpected error:', err);
  res.status(500).json({
    error: {
      message: 'Internal server error',
      statusCode: 500,
    },
  });
}

