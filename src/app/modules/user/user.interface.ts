import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { ITeacher } from '../teacher/teacher.interface';

type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  teacher?: Types.ObjectId | ITeacher;
  // admin?: Types.ObjectId | IAdmin;
};

type UserModel = Model<IUser, Record<string, unknown>>;

export { IUser, UserModel };
