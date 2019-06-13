import { mergeResolvers } from 'merge-graphql-schemas';

// type
import typeScalar from '/graphql/resolvers/type/scalar';

const resolvers = [
  typeScalar
];

export default mergeResolvers(resolvers);
