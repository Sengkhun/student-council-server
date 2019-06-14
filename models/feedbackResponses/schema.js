import { Schema } from "mongoose";

const feedbackResponseSchema = new Schema({
  feedbackId: {
    type: Schema.Types.ObjectId,
    ref: 'feedbacks',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  imageId: {
    type: Schema.Types.ObjectId,
    ref: 'images'
  },
  response: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
});

export default feedbackResponseSchema;
