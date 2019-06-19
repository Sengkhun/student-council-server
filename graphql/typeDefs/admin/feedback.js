import { gql } from 'apollo-server-express';

export default gql`

  type Query {

    getFeedbackAdmin(
      limit: Int!
      skip: Int
    ): FeedbacksResponse!

    getPinFeedbackAdmin(
      limit: Int!
      skip: Int
    ): FeedbacksResponse!

    getFeedbackDetail(
      feedbackId: ID!
    ): FeedbackResponse!

  }

`;