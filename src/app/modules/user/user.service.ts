import { User } from './user.model';
import { IUser } from './user.interface';
import config from '../../../config';
import { generateStudentId, generateTeacherId } from './user.utils';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { startSession } from 'mongoose';
import { Student } from '../student/student.model';
import ApiErr from '../../../errs/ApiErr';
import { BAD_REQUEST } from 'http-status';
import { ITeacher } from '../teacher/teacher.interface';
import { Teacher } from '../teacher/teacher.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.student_default_password as string;
  }

  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(student.semester);

  let newUserAllData = null;

  const session = await startSession();

  try {
    session.startTransaction();

    const id = await generateStudentId(academicSemester);

    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session }); // it will return an array

    if (!newStudent.length)
      throw new ApiErr(BAD_REQUEST, 'Failed to create student !');

    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session }); // it will return an array

    if (!newUser.length)
      throw new ApiErr(BAD_REQUEST, 'Failed to create user !');

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'faculty',
        },
        {
          path: 'depertment',
        },
        {
          path: 'semester',
        },
      ],
    });
  }

  return newUserAllData;
};

const createTeacher = async (
  teacher: ITeacher,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) user.password = config.teacher_default_password as string;

  user.role = 'teacher';

  let newUserAllData = null;
  const session = await startSession();

  try {
    session.startTransaction();

    const id = await generateTeacherId();

    user.id = id;
    teacher.id = id;

    const newTeacher = await Teacher.create([teacher], { session });

    if (!newTeacher.length)
      throw new ApiErr(BAD_REQUEST, 'Failed to create teacher !!');

    user.teacher = newTeacher[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length)
      throw new ApiErr(BAD_REQUEST, 'Failed to create user !!');

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({
      id: newUserAllData.id,
    }).populate({
      path: 'teacher',
      populate: [
        {
          path: 'depertment',
        },
        {
          path: 'faculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = { createStudent, createTeacher };
