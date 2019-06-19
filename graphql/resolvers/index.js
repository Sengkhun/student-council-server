import { mergeResolvers } from 'merge-graphql-schemas';

// type
import typeAnnouncement from '/graphql/resolvers/type/announcement';
import typeFeedback from '/graphql/resolvers/type/feedback';
import typeFeedbackChat from '/graphql/resolvers/type/feedbackChat';
import typeScalar from '/graphql/resolvers/type/scalar';

// user
import userUser from '/graphql/resolvers/user/user';

const resolvers = [
  typeAnnouncement,
  typeFeedback,
  typeFeedbackChat,
  typeScalar,

  userUser
];

export default mergeResolvers(resolvers);
