import { gql } from 'apollo-server-express';

export default gql`

  type Query {

    getCurrentUserAdmin: UserResponse!

  }

  type Mutation {

    editUserNameAdmin(
      firstName: String!
      lastName: String!
    ): Response!

    editUserPasswordAdmin(
      currentPassword: String!
      newPassword: String!
      confirmPassword: String!
    ): Response!

  }

`;