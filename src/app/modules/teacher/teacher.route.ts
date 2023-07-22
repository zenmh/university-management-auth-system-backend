import { Router } from 'express';
import { TeacherController } from './teacher.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = Router();

const { SUPER_ADMIN, ADMIN, STUDENT, TEACHER } = ENUM_USER_ROLE;

// Read
router.get(
  '/',
  auth(ADMIN, SUPER_ADMIN, STUDENT, TEACHER),
  TeacherController.getAllTeachers
);
router.get(
  '/:id',
  auth(ADMIN, SUPER_ADMIN, STUDENT, TEACHER),
  TeacherController.getSingleTeachers
);

export const TeacherRoutes = router;
