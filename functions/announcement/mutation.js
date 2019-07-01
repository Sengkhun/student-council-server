import _ from 'lodash';
import check from 'check-types';
import { RuntimeError } from 'errors';
import path from 'path';
import { ANNOUNCEMENT_FOLDER } from 'constants';
import { 
  AnnouncementImages, 
  Announcements 
} from 'models';
import { 
  createImageThumbnail,
  imageTypeHandler,
  storeFS, 
  resizeImage 
} from '/functions/image/logic';
import { 
  createImage,
  deleteImage
} from '/functions/image/mutation';

// =====================================================

export const createAnnouncement = async args => {
  const { streamImages, tag, title, date, from, to, description, createdBy } = args;
  let announcement = null;
  let announcementImages = [];

  try {
    announcement = await Announcements.create({
      tag, 
      title, 
      date, 
      from,
      to,
      description,
      createdBy
    });

    if (!announcement) {
      throw new RuntimeError();
    }

    if (check.nonEmptyArray(streamImages)) {
      await Promise.all(
        await _.map(streamImages, async (image, index) => {
          let imagePath = await storeFS(ANNOUNCEMENT_FOLDER, image);
          imagePath = await imageTypeHandler({ imagePath });
          await resizeImage({ imagePath, width: 800 });

          const filename = await path.basename(imagePath);
          const thumbnailPath = await createImageThumbnail(imagePath);

          const announcementImage = await createAnnouncementImage({ 
            announcementId: announcement._id,
            name: filename, 
            thumbnail: thumbnailPath, 
            url: imagePath,
            order: index
          });

          announcementImages.push(announcementImage._id);
        })
      );
    }

    return announcement;

  } catch (error) {
    if (announcement) {
      await deleteAnnouncement(announcement._id);
    }

    if (check.nonEmptyArray(announcementImages)) {
      _.map(announcementImages, async announcementImageId => {
        await deleteAnnouncementImage(announcementImageId)
      });
    }
    throw error;
  }
};

// =====================================================

export const createAnnouncementImage = async args => {
  const { announcementId, name, thumbnail, url, order } = args;
  const image = await createImage({ name, thumbnail, url });
  const announcementImage = await AnnouncementImages.create({
    announcementId,
    imageId: image._id,
    order
  });

  if (!announcementImage) {
    throw new RuntimeError();
  }

  return announcementImage;
};

// =====================================================

export const deleteAnnouncement = async announcementId => {
  if (announcementId) {
    await Announcements.deleteOne({ _id: announcementId || ' ' });
  }
};

// =====================================================

export const deleteAnnouncementImage = async announcementImageId => {
  if (announcementImageId) {
    const announcementImage = await AnnouncementImages
      .findOne({ _id: announcementImageId })
      .lean();
    await AnnouncementImages.deleteOne({ _id: announcementImageId || ' ' });

    if (announcementImage) {
      await deleteImage(announcementImage.imageId);
    }
  }
};
