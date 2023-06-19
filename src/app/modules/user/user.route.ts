import { Router } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = Router();

router.post(
  '/create_student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
);

export const UserRoutes = router;
