import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createDepertmentZodSchema,
  updateDepertmentZodSchema,
} from './depertment.validation';
import { DepertmentController } from './depertment.controller';

const router = Router();

// Create
router.post(
  '/create_depertment',
  validateRequest(createDepertmentZodSchema),
  DepertmentController.createDepertment
);

// Update
router.patch(
  '/:id',
  validateRequest(updateDepertmentZodSchema),
  DepertmentController.updateDepertment
);

// Delete
router.delete('/:id', DepertmentController.deleteDepertment);

// Read
router.get('/:id', DepertmentController.getSingleDepertment);
router.get('/', DepertmentController.getAllDepertments);

export const DepertmentRoutes = router;
