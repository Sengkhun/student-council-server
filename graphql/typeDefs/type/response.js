import { gql } from 'apollo-server-express';

export default gql`

  type Response {
    ok: Boolean!
    response: JSON
    error: Error
  }
  
`;
