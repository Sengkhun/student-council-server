import { ADMIN, ANNOUNCEMENT, FEEDBACK } from 'constants';
import { UserInputError, errorHandler } from 'errors';
import { isAllow } from '/functions/middlewares';
import { 
  generateFeedbackReport,
  generateAnnouncementReport
} from '/functions/report/mutation';

export default {

  Mutation: {

    adminGenerateReport: async (parent, args, { user }) => {
      const { type, from, to } = args;
      let report;
      try {
        await isAllow(user, ADMIN);
        if (type === FEEDBACK) {
          report = await generateFeedbackReport({ from, to, createdBy: user._id });
        } else if (type === ANNOUNCEMENT) {
          report = await generateAnnouncementReport({ from, to, createdBy: user._id });
        } else {
          throw new UserInputError;
        }
        return { ok: true, report };
        
      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }

  }

};
