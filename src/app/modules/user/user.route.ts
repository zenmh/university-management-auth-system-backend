import { Router } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = Router();

// Create
router.post(
  '/create_student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

router.post(
  '/create_teacher',
  validateRequest(UserValidation.createTeacherZodSchema),
  UserController.createTeacher
);

export const UserRoutes = router;
