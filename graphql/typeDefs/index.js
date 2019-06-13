import { mergeTypes } from 'merge-graphql-schemas';

// type
import typeEnum from '/graphql/typeDefs/type/enum';
import typeError from '/graphql/typeDefs/type/error';
import typeResponse from '/graphql/typeDefs/type/response';
import typeScalar from '/graphql/typeDefs/type/scalar';

// remove when use, putting dump due to prevent error in GQL
import dump from '/graphql/typeDefs/dump';

const typeDefs = [
  typeEnum,
  typeError,
  typeResponse,
  typeScalar,

  dump  // remove when use
];

export default mergeTypes(typeDefs);
