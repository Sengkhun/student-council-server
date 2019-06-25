import { USER } from 'constants';
import { errorHandler } from 'errors';
import { createFeedback } from '/functions/feedback/query';
import { 
  getFeedback, 
  getFeedbacks 
} from '/functions/feedback/query';
import { isAllow } from '/functions/middlewares';

export default {

  Query: {

    userGetFeedbacks: async (parent, args, { user }) => {
      let feedbacks = [];
      try {
        await isAllow(user, USER);
        const query = { userId: user._id, status: true };
        const sort = '-createdAt';
        feedbacks = await getFeedbacks({ query, sort });
        return { ok: true, feedbacks };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, feedbacks, error };
      }
    },

    userGetFeedbackDetail: async (parent, { feedbackId }, { user }) => {
      try {
        await isAllow(user, USER);
        const query = { _id: feedbackId, userId: user._id, status: true };
        const feedback = await getFeedback(query);
        return { ok: true, feedback };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }

  },

  Mutation: {

    userCreateFeedback: async (parent, args, { user }) => {
      const { images, tag, description } = args;
      try {
        await isAllow(user, USER);
        await createFeedback({
          streamImages: images || [], 
          tag,
          description,
          userId: user._id
        });
        return { ok: true };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }

  }

};
