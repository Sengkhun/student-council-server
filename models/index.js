import mongoose from 'mongoose';

import AnnouncementImages from './announcementImages';
import Announcements from './announcements';
import FeedbackImages from './feedbackImages';
import FeedbackResponses from './feedbackResponses';
import Feedbacks from './feedbacks';
import Images from './images';
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
  FeedbackImages,
  FeedbackResponses,
  Feedbacks,
  Images,
  Users
};
