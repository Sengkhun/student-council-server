import { ADMIN } from 'constants';
import { errorHandler } from 'errors';
import { isAllow } from '/functions/middlewares';
import { createAnnouncement } from '/functions/announcement/mutation';
import { 
  getAnnouncement, 
  getAnnouncements 
} from '/functions/announcement/query';

export default {

  Query: {

    getAnnouncementsAdmin: async (parent, args, { user }) => {
      let announcements = [];
      const { limit, skip } = args;
      try {
        await isAllow(user, ADMIN);
        const query = { status: true };
        const sort = '-updatedAt';
        announcements = await getAnnouncements({ query, sort, limit, skip });
        return { ok: true, announcements };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, announcements, error };
      }
    },

    getAnnouncementDetailAdmin: async (parent, args, { user }) => {
      const { announcementId } = args;
      try {
        await isAllow(user, ADMIN);
        const query = { _id: announcementId, status: true };
        const announcement = await getAnnouncement({ query });
        return { ok: true, announcement };

      } catch (error) {
        console.log("TCL: error", error)
        error = errorHandler(error);
        return { ok: false, error };
      }
    }

  },

  Mutation: {

    createAnnouncementAdmin: async (parent, args, { user }) => {
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
          description,
          createdBy: user._id
        });
        return { ok: true };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }

  }

};