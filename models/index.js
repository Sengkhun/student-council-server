import mongoose from 'mongoose';

import AnnouncementImages from './announcementImages';
import Announcements from './announcements';
import FeedbackChats from './feedbackChats';
import FeedbackImages from './feedbackImages';
import Feedbacks from './feedbacks';
import Images from './images';
import Reports from './reports';
import Users from './users';

// always run validator
mongoose.set('runValidators', true);

// connect to mongodb
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    autoIndex: process.env.NODE_ENV === 'development',
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });
};

export default connectDb;

export {
  AnnouncementImages,
  Announcements,
  FeedbackChats,
  FeedbackImages,
  Feedbacks,
  Images,
  Reports,
  Users
};
