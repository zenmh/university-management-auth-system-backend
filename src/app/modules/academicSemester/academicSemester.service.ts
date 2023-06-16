import { BAD_REQUEST } from 'http-status';
import ApiErr from '../../../errs/ApiErr';
import { AcademicSemesterTitleAndCodeMapping } from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (AcademicSemesterTitleAndCodeMapping[payload.title] !== payload.code)
    throw new ApiErr(BAD_REQUEST, 'Invalid semester code !');

  const result = await AcademicSemester.create(payload);

  return result;
};

const getAllSemesters = async (
  { searchTerm }: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: ['title', 'code', 'year'].map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const result = await AcademicSemester.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = { createSemester, getAllSemesters };
