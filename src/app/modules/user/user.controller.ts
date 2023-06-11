import { RequestHandler } from 'express';
import { UserService } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;

    const result = await UserService.createUser(user);

    return res.status(200).json({
      success: true,
      message: 'User created to DB successfully',
      data: result,
    });
  } catch (err) {
    // return res.status(400).json({
    //   success: false,
    //   message: 'Failed to create user to DB',
    // })

    next(err);
  }
};

export const UserController = { createUser };
