import { gql } from 'apollo-server-express';

export default gql`

  type FeedbackChat {
    _id: ID!
    message: String
    createdAt: Date!

    feedback: Feedback!
    user: User!
    image: Image
  }

  type FeedbackChatResponse {
    ok: Boolean!
    feedbackChat: FeedbackChat
    error: Error
  }

  type FeedbackChatsResponse {
    ok: Boolean!
    feedbackChats: [FeedbackChat!]!
    error: Error
  }
  
`;
