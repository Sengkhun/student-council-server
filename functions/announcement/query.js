import _ from 'lodash';
import { Announcements, AnnouncementImages } from 'models';
import { getImage } from '/functions/image/query';

// =====================================================

export const getAnnouncement = async ({ query, select }) => {
  const announcement = await Announcements
    .findOne(query || { status: true })
    .select(select)
    .lean();
  return announcement;
};

// =====================================================

export const getAnnouncements = async ({ query, sort, limit, skip }) => {
  const announcements = await Announcements
    .find(query || { status: true })
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .lean();
  return announcements;
};

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
      images.push({ ...img, order });
    })
  );

  return images;
};