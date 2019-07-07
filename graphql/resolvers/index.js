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
import adminReport from '/graphql/resolvers/admin/report';
import adminUser from '/graphql/resolvers/admin/user';

// student
import studentAnnouncement from '/graphql/resolvers/student/announcement';
import studentAuthentication from '/graphql/resolvers/student/authentication';
import studentFeedback from '/graphql/resolvers/student/feedback';
import studentUser from '/graphql/resolvers/student/user';

const resolvers = [
  typeAnnouncement,
  typeFeedback,
  typeFeedbackChat,
  typeScalar,

  adminAnnouncement,
  adminAuthentication,
  adminFeedback,
  adminReport,
  adminUser,

  studentAnnouncement,
  studentAuthentication,
  studentFeedback,
  studentUser
];

export default mergeResolvers(resolvers);
