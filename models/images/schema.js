import { Schema } from "mongoose";

const imageSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  thumbnail: {
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

export default imageSchema;
