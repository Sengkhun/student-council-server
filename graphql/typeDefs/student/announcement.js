import { gql } from 'apollo-server-express';

export default gql`

  type Query {

    userGetAnnouncments(
      tag: AllowAnnouncementTag!
      limit: Int
      skip: Int
    ): AnnouncementsResponse!

    userGetAnnouncementDetail(
      announcementId: ID!
    ): AnnouncementResponse!

  }

`;