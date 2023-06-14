import { Response } from 'express';

type ISendResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  } | null;
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: ISendResponse<T>): void => {
  const response: ISendResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data?.message || null,
    meta: data.meta || null,
    data: data?.data || null,
  };

  // there should have a return

  res.status(data.statusCode).json(response);
};

export default sendResponse;
