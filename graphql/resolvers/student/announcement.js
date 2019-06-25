import { USER } from 'constants';
import { errorHandler } from 'errors';
import { 
  getAnnouncement, 
  getAnnouncements 
} from '/functions/announcement/query';
import { isAllow } from '/functions/middlewares';

export default {

  Query: {

    userGetAnnouncments: async (parent, args, { user }) => {
      const { tag, limit, skip } = args;
      let announcements = [];
      try {
        await isAllow(user, USER);
        const query = { tag, status: true };
        const sort = '-createdAt';
        announcements = await getAnnouncements({ query, sort, limit, skip });
        return { ok: true, announcements };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, announcements, error };
      }
    },

    userGetAnnouncementDetail: async (parent, args, { user }) => {
      const { announcementId } = args;
      try {
        await isAllow(user, USER);
        const query = { _id: announcementId, status: true };
        const announcement = await getAnnouncement({ query });
        return { ok: true, announcement };

      } catch (error) {
        error = errorHandler(error);
        return { ok: false, error };
      }
    }

  }

};
