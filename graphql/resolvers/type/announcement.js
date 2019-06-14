import { getUser } from '/functions/user/query';
import { getAnnouncementImages } from '/functions/announcement/query';

export default {

  Announcement: {

    createdBy: async (parent, args, { user }) => {
      const query = { _id: parent.createdBy, status: true };
      return await getUser(query);
    },

    images: async (parent, args, { user }) => {
      const query = { announcementId: parent._id, status: true };
      const sort = { order: 1 };
      const images = await getAnnouncementImages({ query, sort });
      return images;
    }

  }

};
