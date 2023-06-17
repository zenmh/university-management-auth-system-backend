import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createFacultyZodSchema,
  updateFacultyZodSchema,
} from './faculty.validation';
import { FacultyController } from './faculty.controller';

const router = Router();

router.post(
  '/create_faculty',
  validateRequest(createFacultyZodSchema),
  FacultyController.createFaculty
);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(updateFacultyZodSchema),
  FacultyController.updateFaculty
);
router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getAllFaculties);

export const FacultyRoutes = router;
