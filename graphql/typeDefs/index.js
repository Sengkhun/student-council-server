import { mergeTypes } from 'merge-graphql-schemas';

// type
import typeAnnouncement from '/graphql/typeDefs/type/announcement';
import typeEmail from '/graphql/typeDefs/type/email';
import typeEnum from '/graphql/typeDefs/type/enum';
import typeError from '/graphql/typeDefs/type/error';
import typeFeedback from '/graphql/typeDefs/type/feedback';
import typeFeedbackChat from '/graphql/typeDefs/type/feedbackChat';
import typeImage from '/graphql/typeDefs/type/image';
import typeReport from '/graphql/typeDefs/type/report';
import typeResponse from '/graphql/typeDefs/type/response';
import typeScalar from '/graphql/typeDefs/type/scalar';
import typeUser from '/graphql/typeDefs/type/user';

// admin
import adminAnnouncement from '/graphql/typeDefs/admin/announcement';
import adminAuthentication from '/graphql/typeDefs/admin/authentication';
import adminFeedback from '/graphql/typeDefs/admin/feedback';
import adminReport from '/graphql/typeDefs/admin/report';
import adminUser from '/graphql/typeDefs/admin/user';

// student
import studentAnnouncement from '/graphql/typeDefs/student/announcement';
import studentAuthentication from '/graphql/typeDefs/student/authentication';
import studentFeedback from '/graphql/typeDefs/student/feedback';
import studentUser from '/graphql/typeDefs/student/user';

const typeDefs = [
  typeAnnouncement,
  typeEmail,
  typeEnum,
  typeError,
  typeFeedback,
  typeFeedbackChat,
  typeImage,
  typeReport,
  typeResponse,
  typeScalar,
  typeUser,

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

export default mergeTypes(typeDefs);
