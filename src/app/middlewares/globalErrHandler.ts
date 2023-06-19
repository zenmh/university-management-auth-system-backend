import { ErrorRequestHandler, Request, Response } from 'express';
import { IGenericErrorMessage } from '../../interfaces/error';
import config from '../../config';
import handleValidationError from '../../errs/handleValidationError';
import ApiErr from '../../errs/ApiErr';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errs/handleZodError';
import handleCastError from '../../errs/handleCastError';

const globalErrHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response
  // next: NextFunction
) => {
  config.env === 'development'
    ? console.log('globalErrorHandler ~ 💀😈💀', err)
    : errorLogger.error('globalErrorHandler ~ 💀😈💀', err);

  let statusCode = 500;
  let message = 'Something went wrong !!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simplefiedError = handleValidationError(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorMessages = simplefiedError?.errorMessages;
  } else if (err instanceof ZodError) {
    const simplefiedError = handleZodError(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorMessages = simplefiedError?.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplefiedError = handleCastError(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorMessages = simplefiedError?.errorMessages;
  } else if (err instanceof ApiErr) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
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
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
};

export default globalErrHandler;
