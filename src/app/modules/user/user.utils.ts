import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// Student ------------------------------------------>
const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { _id: 0, id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

const generateStudentId = async (
  academicSemester: IAcademicSemester | null
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;

  return incrementedId;
};

// Faculty ------------------------------------------->
const findLastTeacherId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'teacher' }, { _id: 0, id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

const generateTeacherId = async () => {
  const currentId =
    (await findLastTeacherId()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `T-${incrementedId}`;

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

export { generateStudentId, generateTeacherId, generateAdminId };
