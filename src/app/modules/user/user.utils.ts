import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// Student ------------------------------------------>
const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { _id: 0, id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

const generateStudentId = async (academicSemester: IAcademicSemester) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  return incrementedId;
};

// Faculty ------------------------------------------->
const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { _id: 0, id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

const generateFacultyId = async () => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};

// Admin -------------------------------------------->
const findLastAdminId = async () => {
  const lastAdmin = await User.findOne({}, { _id: 0, id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id;
};

const generateAdminId = async (): Promise<string | undefined> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};

export { generateStudentId, generateFacultyId, generateAdminId };
