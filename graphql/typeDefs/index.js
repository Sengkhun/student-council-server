import { mergeTypes } from 'merge-graphql-schemas';

// type
import typeAnnouncement from '/graphql/typeDefs/type/announcement';
import typeEmail from '/graphql/typeDefs/type/email';
import typeEnum from '/graphql/typeDefs/type/enum';
import typeError from '/graphql/typeDefs/type/error';
import typeFeedback from '/graphql/typeDefs/type/feedback';
import typeFeedbackChat from '/graphql/typeDefs/type/feedbackChat';
import typeImage from '/graphql/typeDefs/type/image';
import typeResponse from '/graphql/typeDefs/type/response';
import typeScalar from '/graphql/typeDefs/type/scalar';
import typeUser from '/graphql/typeDefs/type/user';

// user
import userUser from '/graphql/typeDefs/user/user';

// remove when use, putting dump due to prevent error in GQL
import dump from '/graphql/typeDefs/dump';

const typeDefs = [
  typeAnnouncement,
  typeEmail,
  typeEnum,
  typeError,
  typeFeedback,
  typeFeedbackChat,
  typeImage,
  typeResponse,
  typeScalar,
  typeUser,

  dump,  // remove when use

  userUser
];

export default mergeTypes(typeDefs);
