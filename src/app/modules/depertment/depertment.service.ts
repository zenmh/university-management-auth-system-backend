import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { depertmentSearchableFields } from './depertment.constant';
import { IDepertment, IDepertmentFilters } from './depertment.interface';
import { Depertment } from './depertment.model';

const createDepertment = async (payload: IDepertment): Promise<IDepertment> => {
  const result = await Depertment.create(payload);
  return result;
};

const getAllDepertments = async (
  { searchTerm, ...filtersData }: IDepertmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDepertment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: depertmentSearchableFields.map(field => ({
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

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Depertment.find(whereConditions)
    .populate('faculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Depertment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepertment = async (id: string): Promise<IDepertment | null> => {
  const result = await Depertment.findById(id).populate('faculty');
  return result;
};

const updateDepertment = async (
  id: string,
  payload: Partial<IDepertment>
): Promise<IDepertment | null> => {
  const result = await Depertment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteDepertment = async (id: string): Promise<IDepertment | null> => {
  const result = await Depertment.findByIdAndDelete(id);
  return result;
};

export const DepertmentService = {
  createDepertment,
  getAllDepertments,
  getSingleDepertment,
  updateDepertment,
  deleteDepertment,
};
