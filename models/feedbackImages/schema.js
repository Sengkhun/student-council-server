import { Schema } from "mongoose";
import { integerHelper } from 'models/helpers';

const feedbackImageSchema = new Schema({
  feedbackId: {
    type: Schema.Types.ObjectId,
    ref: 'feedbacks',
    required: true
  },
  imageId: {
    type: Schema.Types.ObjectId,
    ref: 'images',
    required: true
  },
  order: {
    type: Number,
    min: 0,
    default: 0,
    set: integerHelper,
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

export default feedbackImageSchema;
