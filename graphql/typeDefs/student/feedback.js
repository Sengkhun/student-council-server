import { gql } from 'apollo-server-express';

export default gql`

  type Query {

    userGetFeedbacks: FeedbacksResponse!

    userGetFeedbackDetail(
      feedbackId: ID!
    ): FeedbacksResponse!

  }

  type Mutation {

    userCreateFeedback(
      images: [Upload]!
      tag: AllowFeedbackTag!
      description: String!
    ): Response!

  }

`;