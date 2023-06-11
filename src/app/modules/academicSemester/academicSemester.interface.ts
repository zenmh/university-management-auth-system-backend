import { Model } from 'mongoose';

type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

type IAcademicSemesterCodes = '01' | '02' | '03';

type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

type IAcademicSemester = {
  title: IAcademicSemesterTitles;
  year: number;
  code: IAcademicSemesterCodes;
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
};

type AcademicSemesterModel = Model<IAcademicSemester>;

export {
  IAcademicSemesterTitles,
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemester,
  AcademicSemesterModel,
};
