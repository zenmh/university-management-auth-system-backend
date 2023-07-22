import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { DepertmentRoutes } from '../modules/depertment/depertment.route';
import { StudentRoutes } from '../modules/student/student.route';
import { TeacherRoutes } from '../modules/teacher/teacher.route';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

[
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/depertments',
    route: DepertmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/teachers',
    route: TeacherRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
].forEach(rt => router.use(rt.path, rt.route));

export const routes = router;
