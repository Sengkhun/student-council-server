import { gql } from 'apollo-server-express';

export default gql`

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: Email!
    role: String!
  }

  type UserResponse {
    ok: Boolean!
    user: User
    error: Error
  }
  
`;
