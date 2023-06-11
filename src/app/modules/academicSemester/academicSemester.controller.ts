import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ...academicSemesterData } = req.body;

    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    return res.status(200).json({
      success: true,
      message: 'Semester created to DB successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AcademicSemesterController = { createSemester };
