const gender = ['male', 'female'];

const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const studentSearchableFields = [
  'id',
  'email',
  'contactNo',
  'name.firstName',
  'name.middleName',
  'name.lastName',
];

const studentFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];

export { gender, bloodGroup, studentSearchableFields, studentFilterableFields };
