import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';

import typeDefs from '/graphql/typeDefs';
import resolvers from '/graphql/resolvers';
import { getUserByToken } from '/functions/authentication/token';

// =====================================================

const context = async ({ req, connection }) => {
  // subscription context
  if (connection && connection.context) {
    return connection.context;
  }

  // normal request context
  const { headers } = req;
  if (headers) {
    const token = headers['auth-token'];
    const user = await getUserByToken(token);
    return { user };
  }

  return {};
};

// =====================================================

const formatError = err => {
  if (err) {
    const { extensions, path, message } = err;
    const code = extensions && extensions.code || path && path[0];
    console.log(`FormatError: ${code} -> ${message}`);
    return { code, message };

  } else {
    console.log('FormatError: Something went wrong');
    return { code: 'UNEXPECTED', message: 'Something went wrong'};
  }
};

// =====================================================

const apollo = new ApolloServer({
  typeDefs, 
  resolvers,
  context,
  formatError,
  uploads: false,
  playground: process.env.NODE_ENV === 'development',
  validationRules: [depthLimit(10)]
});

export default apollo;
