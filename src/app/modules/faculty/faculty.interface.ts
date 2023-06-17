import { Model } from 'mongoose';

type IFaculty = {
  title: string;
};

type FacultyModel = Model<IFaculty, Record<string, unknown>>;

type IFacultyFilters = {
  searchTerm?: string;
};

export { IFaculty, FacultyModel, IFacultyFilters };
