import { BAD_REQUEST } from 'http-status';
import ApiErr from '../../../errs/ApiErr';
import { AcademicSemesterTitleAndCodeMapping } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (AcademicSemesterTitleAndCodeMapping[payload.title] !== payload.code)
    throw new ApiErr(BAD_REQUEST, 'Invalid semester code !');

  const result = await AcademicSemester.create(payload);

  return result;
};

export const AcademicSemesterService = { createSemester };
