import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../../helpers/jwtHelpers';
import ApiErr from '../../errs/ApiErr';
import { FORBIDDEN, UNAUTHORIZED } from 'http-status';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) throw new ApiErr(UNAUTHORIZED, 'You are not authorized !!');

      const verifiedUser = verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role))
        throw new ApiErr(FORBIDDEN, 'Forbidden user !!');

      next();
    } catch (err) {
      next(err);
    }
  };

export default auth;
