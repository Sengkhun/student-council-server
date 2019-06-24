import { ADMIN } from 'constants';
import { errorHandler } from 'errors';
import { isAllow } from '/functions/middlewares';
import { createAnnouncement } from '/functions/announcement/mutation';

export default {

  Mutation: {

    createAnnouncementAdmin: async (parent, args, context) => {
      const { images, tag, title, date, from, to, description } = args;
      try {
        await isAllow(user, ADMIN);
        await createAnnouncement({
          streamImages: images || [], 
          tag, 
          title, 
          date, 
          from, 
          to, 
          description
        });
        return { ok: true };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }

  }

};