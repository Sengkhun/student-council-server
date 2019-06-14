import { mergeResolvers } from 'merge-graphql-schemas';

// type
import typeAnnouncement from '/graphql/resolvers/type/announcement';
import typeFeedback from '/graphql/resolvers/type/feedback';
import typeFeedbackChat from '/graphql/resolvers/type/feedbackChat';
import typeScalar from '/graphql/resolvers/type/scalar';

const resolvers = [
  typeAnnouncement,
  typeFeedback,
  typeFeedbackChat,
  typeScalar
];

export default mergeResolvers(resolvers);
