import { ApolloError } from "apollo-server-express";

class RuntimeError extends ApolloError {

  constructor(message, properties) {
    super(
      message, 
      "RUNTIME_ERROR", 
      properties
    );
  }

};

export default RuntimeError;
