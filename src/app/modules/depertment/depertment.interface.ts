import { Model, Types } from 'mongoose';
import { IFaculty } from '../faculty/faculty.interface';

type IDepertment = {
  title: string;
  faculty: Types.ObjectId | IFaculty;
};

type DepertmentModel = Model<IDepertment, Record<string, unknown>>;

type IDepertmentFilters = {
  searchTerm?: string;
  faculty?: Types.ObjectId;
};

export { IDepertment, DepertmentModel, IDepertmentFilters };
