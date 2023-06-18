import { Schema, Types, model } from 'mongoose';
import { DepertmentModel, IDepertment } from './depertment.interface';

const depertmentSehema = new Schema<IDepertment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    faculty: {
      type: Types.ObjectId,
      required: true,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Depertment = model<IDepertment, DepertmentModel>(
  'Depertment',
  depertmentSehema
);

export { Depertment };
