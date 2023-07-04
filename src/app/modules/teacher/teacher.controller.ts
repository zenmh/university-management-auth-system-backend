import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { teacherFilterableFidlds } from './teacher.constant';
import { paginationFields } from '../../../constants/pagination';
import { TeacherService } from './teacher.service';
import sendResponse from '../../../shared/sendResponse';
import { ITeacher } from './teacher.interface';
import { OK } from 'http-status';

const getAllTeachers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, teacherFilterableFidlds);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await TeacherService.getAllTeachers(
    filters,
    paginationOptions
  );

  sendResponse<ITeacher[]>(res, {
    statusCode: OK,
    success: true,
    message: 'Teachers retrived successfully !',
    meta: result?.meta,
    data: result?.data,
  });
});

export const TeacherController = { getAllTeachers };
