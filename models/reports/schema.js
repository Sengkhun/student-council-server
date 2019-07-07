import { ANNOUNCEMENT, FEEDBACK } from 'constants';
import { Schema } from "mongoose";

const reportSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  type: {
    type: String,
    enum: [ANNOUNCEMENT, FEEDBACK],
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  url: {
    type: String,
    trim: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: Boolean,
    index: true,
    default: true,
    required: true
  }
});

export default reportSchema;
