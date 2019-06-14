import { gql } from 'apollo-server-express';

export default gql`

  type Announcement {
    _id: ID!
    tag: String!
    title: String!
    date: Date
    from: Date
    to: Date
    description: String!
    createdAt: Date!

    createdBy: User!
    images: [Images!]!
  }

  type AnnouncementResponse {
    ok: Boolean!
    announcement: Announcement
    error: Error
  }

  type AnnouncementsResponse {
    ok: Boolean!
    Announcements: [Announcement!]!
    error: Error
  }
  
`;
