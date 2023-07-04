import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createFacultyZodSchema,
  updateFacultyZodSchema,
} from './faculty.validation';
import { FacultyController } from './faculty.controller';

const router = Router();

// Create
router.post(
  '/create_faculty',
  validateRequest(createFacultyZodSchema),
  FacultyController.createFaculty
);

// Update
router.patch(
  '/:id',
  validateRequest(updateFacultyZodSchema),
  FacultyController.updateFaculty
);

// Delete
router.delete('/:id', FacultyController.deleteFaculty);

// Read
router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getAllFaculties);

export const FacultyRoutes = router;
