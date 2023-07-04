import { Model, Types } from 'mongoose';
import { IFaculty } from '../faculty/faculty.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IDepertment } from '../depertment/depertment.interface';

type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

type LocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

type IStudent = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGurdian: LocalGurdian;
  faculty: Types.ObjectId | IFaculty;
  semester: Types.ObjectId | IAcademicSemester;
  depertment: Types.ObjectId | IDepertment;
  profileImage?: string;
};

type StudentModel = Model<IStudent, Record<string, unknown>>;

type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};

export { IStudent, StudentModel, IStudentFilters };
