import { ADMIN } from 'constants';
import { errorHandler } from 'errors';
import { isAllow } from '/functions/middlewares';
import { editFeedback } from '/functions/feedback/mutation';
import { 
  getFeedback, 
  getFeedbacks 
} from '/functions/feedback/query';

export default {

  Query: {

    adminGetFeedback: async (parent, args, { user }) => {
      const { limit, skip } = args;
      let feedbacks = [];
      try{
        await isAllow(user, ADMIN);
        const query = { status: true };
        const sort = '-createdAt';
        feedbacks = await getFeedbacks({ query, sort, limit, skip });
        return { ok: true, feedbacks };

      }catch (error) {
        error = errorHandler(error);
        return { ok: false, feedbacks, error };
      }
    },

    adminGetPinFeedback: async (parent, args, { user }) => {
      const { limit, skip } = args;
      let feedbacks = [];
      try{
        await isAllow(user, ADMIN);
        const query = { pin: true, status: true };
        const sort = '-createdAt';
        feedbacks = await getFeedbacks({ query, sort, limit, skip });
        return { ok: true, feedbacks };

      }catch (error) {
        error = errorHandler(error);
        return { ok: false, feedbacks, error };
      }
    },

    adminGetFeedbackDetail: async (parent, args, { user }) => {
      const { feedbackId } = args;
      try{
        await isAllow(user, ADMIN);
        const query = { _id: feedbackId, status: true };
        const feedback = await getFeedback(query);
        return { ok: true, feedback };

      }catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }

  },

  Mutation: {

    adminPinFeedback: async (parent, args, { user }) => {
      const { feedbackId } = args;
      try {
        await isAllow(user, ADMIN);
        const query = { _id: feedbackId, status: true };
        const update = { pin: true };
        await editFeedback({ query, update });
        return { ok: true };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }

  }

}
