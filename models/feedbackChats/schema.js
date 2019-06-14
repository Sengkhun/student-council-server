import { Schema } from "mongoose";

const feedbackChatSchema = new Schema({
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
  message: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
});

export default feedbackChatSchema;
