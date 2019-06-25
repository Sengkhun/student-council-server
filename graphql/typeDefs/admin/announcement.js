import { gql } from 'apollo-server-express';

export default gql`

  type Query {

    getAnnouncementsAdmin(
      limit: Int
      skip: Int
    ): AnnouncementsResponse!

    getAnnouncementDetailAdmin(
      announcementId: ID!
    ): AnnouncementResponse!

  }

  type Mutation {

    createAnnouncementAdmin(
      images: [Upload]!
      tag: AllowAnnouncementTag!
      title: String!
      date: Date
      from: Date
      to: Date
      description: String!
    ): Response!

  }

`;