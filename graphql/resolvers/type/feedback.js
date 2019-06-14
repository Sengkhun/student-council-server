import { getUser } from '/functions/user/query';
import { getFeedbackImages } from '/functions/feedback/query';

export default {

  Feedback: {

    user: async (parent, args, { user }) => {
      const query = { _id: parent.userId, status: true };
      return await getUser(query);
    },

    images: async (parent, args, { user }) => {
      const query = { feedbackId: parent._id, status: true };
      const sort = { order: 1 };
      const images = await getFeedbackImages({ query, sort });
      return images;
    }

  }

};
