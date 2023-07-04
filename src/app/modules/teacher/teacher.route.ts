import { Router } from 'express';
import { TeacherController } from './teacher.controller';

const router = Router();

// Read
router.get('/', TeacherController.getAllTeachers);

export const TeacherRoutes = router;
