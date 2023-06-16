import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
