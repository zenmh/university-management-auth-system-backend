import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { studentFilterableFields } from './student.constant';
import sendResponse from '../../../shared/sendResponse';
import { IStudent } from './student.interface';
import { OK } from 'http-status';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: OK,
    success: true,
    message: 'Students retrived successfully !',
    meta: result?.meta,
    data: result?.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getSingleStudent(req.params.id);

  sendResponse<IStudent>(res, {
    statusCode: OK,
    success: true,
    message: 'Student retrived successfully !',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.deleteStudent(req.params.id);

  sendResponse<IStudent>(res, {
    statusCode: OK,
    success: true,
    message: 'Studenet delete successfully !',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.updateStudent(req.params.id, req.body);

  sendResponse<IStudent>(res, {
    statusCode: OK,
    success: true,
    message: 'Student updated successfully !',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
