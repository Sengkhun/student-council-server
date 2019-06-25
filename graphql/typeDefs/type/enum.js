import { gql } from 'apollo-server-express';

export default gql`

  enum AllowGender {
    male
    female
  }

  enum AllowAnnouncementTag {
    event
    announcement
    news
  }

`;
