import mongoose from 'mongoose';

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
  Users
};
