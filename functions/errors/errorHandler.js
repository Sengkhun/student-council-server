import _ from 'lodash';

export default error => {
  let { code, name, extensions, message, path } = error;

  if (name === 'MongoError' || name === 'ValidationError') {
    // database error
    message = _.last(_.split(message, ':'));
    if (code === 11000) {
      // remove }, \", and space 
      let keyword = message.replace(/}|\"|\s/g, "");
      message = `${keyword} already exist`;
    }
    message = _.trim(message);
    console.log(`ErrorHandler: ${name} -> ${message}`);
    return { code: 'DATABASE_ERROR', message };

  } else {
    // other error
    name = extensions && extensions.code || path && path[0];
    if (name === 'UNAUTENTICATED') {
      throw error;  // throw error to trigger the client side
    } else {
      console.log(`ErrorHandler: ${name} -> ${message}`);
      return { code: extensions && extensions.code, message };
    }
  }
};