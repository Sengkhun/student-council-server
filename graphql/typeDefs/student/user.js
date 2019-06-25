import { gql } from 'apollo-server-express';

export default gql`

  type Query {

    userGetCurrentUser: UserResponse!

  }

  type Mutation {

    userCreateUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): Response!

    userEditUserName(
      firstName: String!
      lastName: String!
    ): Response!

    userEditUserPassword(
      currentPassword: String!
      newPassword: String!
      confirmPassword: String!
    ): Response!

  }

`;