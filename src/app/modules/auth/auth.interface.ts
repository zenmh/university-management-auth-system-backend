import { ENUM_USER_ROLE } from '../../../enums/user';

type IUserLogin = {
  id: string;
  password: string;
};

type IUserLoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

type IRefreshTokenResponse = {
  accessToken: string;
};

type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};

export {
  IUserLogin,
  IUserLoginResponse,
  IRefreshTokenResponse,
  IVerifiedLoginUser,
};
