import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err?.path,
      message: 'Invalid Id',
    },
  ];

  return {
    statusCode: 400,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
