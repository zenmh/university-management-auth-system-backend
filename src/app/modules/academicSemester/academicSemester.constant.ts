import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from './academicSemester.interface';

const AcademicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

const AcademicSemesterCodes: IAcademicSemesterCodes[] = ['01', '02', '03'];

const AcademicSemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AcademicSemesterTitleAndCodeMapping: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

const AcademicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'year',
  'code',
];

const AcademicSemesterSearchableFields = ['title', 'code', 'year'];

export {
  AcademicSemesterTitles,
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterTitleAndCodeMapping,
  AcademicSemesterFilterableFields,
  AcademicSemesterSearchableFields,
};
