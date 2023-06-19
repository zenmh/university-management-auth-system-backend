import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required !',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last name is required !',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required !',
      }),
      dateOfBirth: z.string().optional(),
      email: z.string({ required_error: 'Email is required !' }).email(),
      contactNo: z.string({ required_error: 'Contact no is required !' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact no is required !',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'Present address is required !',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required !',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: "Father's name is required !",
        }),
        fatherOccupation: z.string({
          required_error: "Father's occupation is required !",
        }),
        fatherContactNo: z.string({
          required_error: "Father's contact no is required !",
        }),
        motherName: z.string({
          required_error: "Mother's name is required !",
        }),
        motherOccupation: z.string({
          required_error: "Mother's occupation is required !",
        }),
        motherContactNo: z.string({
          required_error: "Mother's contact no is required !",
        }),
        address: z.string({ required_error: 'Guardian address si required !' }),
      }),
      localGurdian: z.object({
        name: z.string({ required_error: 'Local guardian name is required !' }),
        occupation: z.string({
          required_error: 'Local guardian occupation is required !',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact no is required !',
        }),
        address: z.string({
          required_error: 'Local guardian address is required !',
        }),
      }),
      faculty: z.string({
        required_error: 'Faculty is required !',
      }),
      semester: z.string({ required_error: 'Semester is required !' }),
      depertment: z.string({ required_error: 'Depertment is required !' }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = { createStudentZodSchema };
