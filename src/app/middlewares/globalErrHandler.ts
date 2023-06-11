import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../../interfaces/error';
import config from '../../config';
import handleValidationError from '../../errs/handleValidationError';
import ApiErr from '../../errs/ApiErr';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errs/handleZodError';

const globalErrHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === 'development'
    ? console.log('globalErrHandler ~ 💀😈💀', err)
    : errorLogger.error('globalErrHandler ~ 💀😈💀', err);

  let statusCode = 500;
  let message = 'Something went wrong !!';
  let errorMessage: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simplefiedError = handleValidationError(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorMessage = simplefiedError?.errorMessages;
  } else if (err instanceof ZodError) {
    const simplefiedError = handleZodError(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorMessage = simplefiedError?.errorMessages;
  } else if (err instanceof ApiErr) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });

  next();
};

export default globalErrHandler;
