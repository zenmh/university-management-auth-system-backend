import { Model } from 'mongoose';

type IUser = {
  id: string;
  role: string;
  password: string;
};

// type UserModel = Model<IUser, object>
type UserModel = Model<IUser, Record<string, unknown>>; // that I take from 12-10 module or 13-1

export { IUser, UserModel };
