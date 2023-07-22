import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { facultySearchableFields } from '../faculty/faculty.constant';
import { IFacultyFilters } from '../faculty/faculty.interface';
import { ITeacher } from './teacher.interface';
import { Teacher } from './teacher.model';

const getAllTeachers = async (
  { searchTerm, ...filtersData }: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITeacher[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const whereConditins =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Teacher.find(whereConditins)
    .populate('depertment')
    .populate('faculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Teacher.countDocuments(whereConditins);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleTeacher = async (id: string): Promise<ITeacher | null> => {
  const result = await Teacher.findOne({ _id: id })
    .populate('depertment')
    .populate('faculty');

  return result;
};

export const TeacherService = { getAllTeachers, getSingleTeacher };
