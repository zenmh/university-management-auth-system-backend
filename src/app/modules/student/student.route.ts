import { Router } from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';

const router = Router();

// Update
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

// Read
router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
