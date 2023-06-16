import { z } from 'zod';
import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterTitles,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required !',
    }),
    year: z.string({ required_error: 'Year is required !' }),
    code: z.enum([...AcademicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is required !',
    }),
    startMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start month is required !',
    }),
    endMonth: z.enum([...AcademicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is required !',
    }),
  }),
});

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicSemesterTitles] as [string, ...string[]], {
          required_error: 'Title is required !',
        })
        .optional(),
      year: z.string({ required_error: 'Year is required !' }).optional(),
      code: z
        .enum([...AcademicSemesterCodes] as [string, ...string[]], {
          required_error: 'Code is required !',
        })
        .optional(),
      startMonth: z
        .enum([...AcademicSemesterMonths] as [string, ...string[]], {
          required_error: 'Start month is required !',
        })
        .optional(),
      endMonth: z
        .enum([...AcademicSemesterMonths] as [string, ...string[]], {
          required_error: 'End month is required !',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either title and code both sould provided or nither !!',
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
