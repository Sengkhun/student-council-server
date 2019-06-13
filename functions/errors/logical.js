import { ApolloError } from "apollo-server-express";

class LogicalError extends ApolloError {

  constructor(message, properties) {
    super(
      message, 
      "LOGICAL_ERROR", 
      properties
    );
  }

};

export default LogicalError;
