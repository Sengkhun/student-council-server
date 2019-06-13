import { Schema } from "mongoose";
import { USER, ADMIN } from "constants";

// =====================================================

const emailSchema = new Schema({
  address: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
    required: true
  },
  verified: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  _id: false,
  timestamps: true
});

// =====================================================

const passwordSchema = new Schema({
  bcrypt: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  _id: false
});

// =====================================================

const loginTokenSchema = new Schema({
  token: {
    type: String,
    required: true
  }
}, {
  _id: false,
  timestamps: true
});

// =====================================================

const userSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    minlength: 2,
    maxLength: 20,
    required: true
  },
  email: {
    type: emailSchema
  },
  password: {
    type: passwordSchema
  },
  oldPassword: {
    type: [passwordSchema]
  },
  loginTokens: {
    type: [loginTokenSchema]
  },
  roles: {
    type: [String],
    index: true,
    lowercase: true,
    trim: true,
    default: USER,
    required: true
  },
  type: {
    type: String,
    index: true,
    enum: [USER, ADMIN],
    default: USER,
    required: true
  },
  status: {
    type: Boolean,
    index: true,
    default: true,
    required: true
  }
}, {
  timestamps: true,
});

export default userSchema;
