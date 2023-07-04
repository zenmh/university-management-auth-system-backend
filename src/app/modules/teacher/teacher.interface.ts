import { Model, Types } from 'mongoose';
import { IDepertment } from '../depertment/depertment.interface';
import { IFaculty } from '../faculty/faculty.interface';

type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

type ITeacher = {
  id: string;
  name: UserName;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: 'male' | 'female';
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

  depertment: Types.ObjectId | IDepertment;
  faculty: Types.ObjectId | IFaculty;
  designation: string;
};

type TeacherModel = Model<ITeacher, Record<string, unknown>>;

type ITeacherFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNO?: string;
  emergencyContactNo?: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  depertment?: string;
  faculty?: string;
  designation?: string;
};

export { ITeacher, TeacherModel, ITeacherFilters };
