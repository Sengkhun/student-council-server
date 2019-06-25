import { gql } from 'apollo-server-express';

export default gql`

  type Mutation {

    userLogin(
      email: String!
      password: String!
    ): Response!

    userVerifyToken: UserResponse!

    userLogout(
      token: String!
    ): Response!

  }

`;