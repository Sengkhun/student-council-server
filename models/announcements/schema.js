import { Schema } from "mongoose";
import { EVENT, ANNOUNCEMENT, NEWS } from 'constants';

const announcementSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  tag: {
    type: String,
    enum: [EVENT, ANNOUNCEMENT, NEWS],
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: Date
  },
  from: {
    type: Date
  },
  to: {
    type: Date
  },
  description: {
    type: String,
    trim: true
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

export default announcementSchema;
