import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { DepertmentService } from './depertment.service';
import sendResponse from '../../../shared/sendResponse';
import { IDepertment } from './depertment.interface';
import { OK } from 'http-status';
import pick from '../../../shared/pick';
import { depertmentFilterableFields } from './depertment.constant';
import { paginationFields } from '../../../constants/pagination';

const createDepertment = catchAsync(async (req: Request, res: Response) => {
  const { ...depertmentData } = req.body;

  const result = await DepertmentService.createDepertment(depertmentData);

  sendResponse<IDepertment>(res, {
    statusCode: OK,
    success: true,
    message: 'Depertment created successfully !',
    data: result,
  });
});

const getAllDepertments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, depertmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await DepertmentService.getAllDepertments(
    filters,
    paginationOptions
  );

  sendResponse<IDepertment[]>(res, {
    statusCode: OK,
    success: true,
    message: 'All depertments retrived successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepertment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepertmentService.getSingleDepertment(req.params.id);

  sendResponse<IDepertment>(res, {
    statusCode: OK,
    success: true,
    message: 'Depertment retrived successfully !',
    data: result,
  });
});

const updateDepertment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepertmentService.updateDepertment(
    req.params.id,
    req.body
  );

  sendResponse<IDepertment>(res, {
    statusCode: OK,
    success: true,
    message: 'Depertment update successfully !',
    data: result,
  });
});

const deleteDepertment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepertmentService.deleteDepertment(req.params.id);

  sendResponse<IDepertment>(res, {
    statusCode: OK,
    success: true,
    message: 'Depertment delete successfully !',
    data: result,
  });
});

export const DepertmentController = {
  createDepertment,
  getAllDepertments,
  getSingleDepertment,
  updateDepertment,
  deleteDepertment,
};
