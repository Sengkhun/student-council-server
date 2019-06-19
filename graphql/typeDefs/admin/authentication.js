import { gql } from 'apollo-server-express';

export default gql`

  type Mutation {

    loginAdmin(
      email: String!
      password: String!
    ): Response!

    verifyTokenAdmin: UserResponse!

    logoutAdmin(token: String!): Response!

  }

`;