import { ApolloError } from "apollo-server-express";

class AuthenticationError extends ApolloError {

  constructor(message, properties) {
    super(
      message || 'require login',
      'UNAUTENTICATED',
      properties
    );
  }

};

export default AuthenticationError;
