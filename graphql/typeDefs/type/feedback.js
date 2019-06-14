import { gql } from 'apollo-server-express';

export default gql`

  type Feedback {
    _id: ID!
    tag: String!
    description: String!
    createdAt: Date!

    user: User!
    images: [Images!]!
  }

  type FeedbackResponse {
    ok: Boolean!
    feedback: Feedback
    error: Error
  }

  type FeedbacksResponse {
    ok: Boolean!
    feedbacks: [Feedback!]!
    error: Error
  }
  
`;
