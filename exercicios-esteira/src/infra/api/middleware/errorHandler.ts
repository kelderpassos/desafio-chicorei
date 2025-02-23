import { ErrorRequestHandler } from 'express';
import RequestError from '../utils/RequestError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof RequestError) {
    const { statusCode, message } = err;
    return res.status(statusCode).json({ message });
  }

  return res.status(500).json({ message: err.message });
};
