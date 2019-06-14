import { gql } from 'apollo-server-express';

export default gql`

  type Email {
    address: String!
    verified: Boolean!
  }
  
`;
