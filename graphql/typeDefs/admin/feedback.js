import { gql } from 'apollo-server-express';

export default gql`

  type Query {

    adminGetFeedback(
      limit: Int
      skip: Int
    ): FeedbacksResponse!

    adminGetPinFeedback(
      limit: Int
      skip: Int
    ): FeedbacksResponse!

    adminGetFeedbackDetail(
      feedbackId: ID!
    ): FeedbackResponse!

  }

  type Mutation {

    adminPinFeedback(
      feedbackId: ID!
    ): Response!

  }

`;