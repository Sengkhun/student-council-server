import { gql } from 'apollo-server-express';

export default gql`

  type Query {
    dumpQuery: Boolean!
  }

  type Mutation {
    dumpMutation: Boolean!
  }

`;
