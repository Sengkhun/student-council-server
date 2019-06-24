import { ApolloError } from "apollo-server-express";

class RuntimeError extends ApolloError {

  constructor(message, properties) {
    super(
      message || 'Something went wrong, the action will not performance any action', 
      "RUNTIME_ERROR", 
      properties
    );
  }

};

export default RuntimeError;
