import { ApolloError } from "apollo-server-express";

class ForbiddenError extends ApolloError {

  constructor(message, properties) {
    super(
      message || 'permission denied',
      'UNAUTHORIZED',
      properties
    );
  }

};

export default ForbiddenError;
