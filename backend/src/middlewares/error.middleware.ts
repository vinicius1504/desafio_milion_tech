import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { env } from '../config/env';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(env.nodeEnv === 'development' && { stack: error.stack }),
    });
    return;
  }

  // Handle unexpected errors
  console.error('Unexpected error:', error);

  res.status(500).json({
    success: false,
    message: env.nodeEnv === 'development' ? error.message : 'Internal server error',
    ...(env.nodeEnv === 'development' && { stack: error.stack }),
  });
};
