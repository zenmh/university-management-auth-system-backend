import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { ITeacher } from '../teacher/teacher.interface';

type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  student?: Types.ObjectId | IStudent;
  teacher?: Types.ObjectId | ITeacher;
  // admin?: Types.ObjectId | IAdmin;
};

// type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser> | null>;
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>;
// };

type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<
    IUser,
    'id' | 'password' | 'role' | 'needsPasswordChange'
  > | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export { IUser, UserModel };
