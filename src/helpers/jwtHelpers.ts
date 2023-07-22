import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expiresTime: string
) => {
  return sign(payload, secret, { expiresIn: expiresTime });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return verify(token, secret) as JwtPayload;
};

export { createToken, verifyToken };
