import { gql } from 'apollo-server-express';

export default gql`

  type Query {
    getUser(id: String, name: String): UserResponse
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!): Response
  }

`;