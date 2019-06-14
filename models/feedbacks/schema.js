import { Schema } from "mongoose";
import { FACILITY, INSTRUCTOR, STUDENT } from 'constants';

const feedbackSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  tag: {
    type: String,
    enum: [FACILITY, INSTRUCTOR, STUDENT],
    required: true
  },
  description: {
    type: String,
    trim: true,
    minlength: 20,
    required: true
  },
  status: {
    type: Boolean,
    index: true,
    default: true,
    required: true
  }
}, {
  timestamps: true
});

export default feedbackSchema;
