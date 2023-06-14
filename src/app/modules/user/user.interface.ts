import { Model } from 'mongoose';

type IUser = {
  id: string;
  role: string;
  password: string;
};

type UserModel = Model<IUser, Record<string, unknown>>;

export { IUser, UserModel };
