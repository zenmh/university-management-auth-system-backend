import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required !' }),
    password: z.string({ required_error: 'Password is required !' }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required !!' }),
  }),
});

export const AuthValidation = { loginZodSchema, refreshTokenZodSchema };
