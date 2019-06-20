import { mergeResolvers } from 'merge-graphql-schemas';

// type
import typeAnnouncement from '/graphql/resolvers/type/announcement';
import typeFeedback from '/graphql/resolvers/type/feedback';
import typeFeedbackChat from '/graphql/resolvers/type/feedbackChat';
import typeScalar from '/graphql/resolvers/type/scalar';

// admin
import adminAnnouncement from '/graphql/resolvers/admin/announcement';
import adminAuthentication from '/graphql/resolvers/admin/authentication';
import adminFeedback from '/graphql/resolvers/admin/feedback';
import adminUser from '/graphql/resolvers/admin/user';

// student
// import studentUser from '/graphql/resolvers/student/user';

const resolvers = [
  typeAnnouncement,
  typeFeedback,
  typeFeedbackChat,
  typeScalar,

  adminAnnouncement,
  adminAuthentication,
  adminFeedback,
  adminUser,

  // studentUser
];

export default mergeResolvers(resolvers);
