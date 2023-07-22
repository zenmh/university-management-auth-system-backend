import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import { OK } from 'http-status';
import { IRefreshTokenResponse, IUserLoginResponse } from './auth.interface';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken, ...others } = await AuthService.loginUser(req.body);

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
  });

  sendResponse<IUserLoginResponse>(res, {
    statusCode: OK,
    success: true,
    message: 'User logged in successfully !',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
  });

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: OK,
    success: true,
    message: 'User logged in successfully ! --> FROM REFRESH TOKEN',
    data: result,
  });
});

export const AuthController = { loginUser, refreshToken };
