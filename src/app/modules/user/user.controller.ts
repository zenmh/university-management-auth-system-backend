import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OK } from 'http-status';
import { IUser } from './user.interface';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;

  const result = await UserService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Student created successfully !',
    data: result,
  });
});

const createTeacher: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { teacher, ...userData } = req.body;
    const result = await UserService.createTeacher(teacher, userData);

    sendResponse<IUser>(res, {
      statusCode: OK,
      success: true,
      message: 'Teacher created successfully !',
      data: result,
    });
  }
);

export const UserController = { createStudent, createTeacher };
