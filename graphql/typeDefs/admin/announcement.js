import { gql } from 'apollo-server-express';

export default gql`

  type Mutation {

    createAnnouncementAdmin(
      images: [Upload]!
      tag: String!
      title: String!
      date: Date
      from: Date
      to: Date
      description: String!
    ): Response!

  }

`;