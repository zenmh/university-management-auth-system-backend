import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = Router();

// Create
router.post(
  '/create_semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

// Update
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

// Delete
router.delete('/:id', AcademicSemesterController.deleteSemester);

// Read
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;
