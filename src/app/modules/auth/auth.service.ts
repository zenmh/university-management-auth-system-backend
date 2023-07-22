import { User } from '../user/user.model';
import {
  IRefreshTokenResponse,
  IUserLogin,
  IUserLoginResponse,
} from './auth.interface';
import ApiErr from '../../../errs/ApiErr';
import { FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { createToken, verifyToken } from '../../../helpers/jwtHelpers';

const loginUser = async ({
  id,
  password,
}: IUserLogin): Promise<IUserLoginResponse> => {
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) throw new ApiErr(NOT_FOUND, 'User not found !!');

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  )
    throw new ApiErr(UNAUTHORIZED, 'Password is incorrect !!');

  const { id: userId, role } = isUserExist;

  const accessToken = createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExist.needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (err) {
    throw new ApiErr(FORBIDDEN, 'Invalid refresh token !!');
  }

  const { userId } = verifiedToken;

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) throw new ApiErr(NOT_FOUND, "User doesn't exist !!");

  const newAccessToken = createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken: newAccessToken };
};

export const AuthService = { loginUser, refreshToken };
