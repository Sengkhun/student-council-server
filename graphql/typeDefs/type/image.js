import { gql } from 'apollo-server-express';

export default gql`

  type Image {
    _id: ID!
    name: String!
    thumbnail: String!
    url: String!
  }

  type Images {
    _id: ID!
    name: String!
    thumbnail: String!
    url: String!
    order: Int!
  }
  
`;
