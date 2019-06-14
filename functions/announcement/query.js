import _ from 'lodash';
import { AnnouncementImages } from 'models';
import { getImage } from '/functions/image/query';

// =====================================================

export const getAnnouncementImages = async ({ query, sort } = {}) => {
  const announcementImages = await AnnouncementImages
    .find(query || { status: true })
    .sort(sort)
    .lean();

  let images = [];
  await Promise.all(
    images = _.map(announcementImages, async ({ imageId, order }) => {
      const img = await getImage({ _id: imageId });
      return { ...img, order };
    })
  );

  return images;
};
