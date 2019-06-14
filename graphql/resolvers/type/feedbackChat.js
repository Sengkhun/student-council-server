import { getUser } from '/functions/user/query';
import { getFeedback } from '/functions/feedback/query';
import { getImage } from '/functions/image/query';

export default {

  FeedbackChat: {

    feedback: async (parent, args, { user }) => {
      const query = { _id: parent.feedbackId, status: true };
      return await getFeedback(query);
    },

    user: async (parent, args, { user }) => {
      const query = { _id: parent.userId, status: true };
      return await getUser(query);
    },

    image: async (parent, args, { user }) => {
      const query = { _id: parent.imageId };
      return await getImage(query)
    }

  }

};
