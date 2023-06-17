import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty, FacultyModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);

export { Faculty };
