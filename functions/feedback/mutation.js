import _ from 'lodash';
import check from 'check-types';
import { FEEDBACK_FOLDER } from 'constants';
import { RuntimeError } from 'errors';
import { FeedbackImages, Feedbacks } from 'models';
import path from 'path';
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

export const createFeedback = async args => {
  const { streamImages, tag, description, userId } = args;
  let feedback = null;
  let feedbackImages = [];

  try {
    feedback = await Feedbacks.create({
      tag,
      description,
      userId
    });

    if (!feedback) {
      throw new RuntimeError();
    }

    if (check.nonEmptyArray(streamImages)) {
      await Promise.all(
        await _.map(streamImages, async (image, index) => {
          let imagePath = await storeFS(FEEDBACK_FOLDER, image);
          imagePath = await imageTypeHandler({ imagePath });
          await resizeImage({ imagePath, width: 800 });

          const filename = await path.basename(imagePath);
          const thumbnailPath = await createImageThumbnail(imagePath);

          const feedbackImage = await createFeedbackImage({ 
            feedbackId: feedback._id,
            name: filename, 
            thumbnail: thumbnailPath, 
            url: imagePath,
            order: index
          });

          feedbackImages.push(feedbackImage._id);
        })
      );
    }

    return feedback;

  } catch (error) {
    if (feedback) {
      await deleteFeedback(feedback._id);
    }

    if (check.nonEmptyArray(feedbackImages)) {
      _.map(feedbackImages, async feedbackImageId => {
        await deleteFeedbackImage(feedbackImageId)
      });
    }
    throw error;
  }
};

// =====================================================

export const createFeedbackImage = async args => {
  const { feedbackId, name, thumbnail, url, order } = args;
  const image = await createImage({ name, thumbnail, url });
  const feedbackImage = await FeedbackImages.create({
    feedbackId,
    imageId: image._id,
    order
  });

  if (!feedbackImage) {
    throw new RuntimeError();
  }

  return feedbackImage;
};

// =====================================================

export const editFeedback = async args => {
  const { query, update, throwError = true } = args;
  const affected = await Feedbacks.updateOne(query, { $set: { ...update } });
  if (throwError && affected.nModified <= 0) {
    throw new RuntimeError('Cannot update feedback');
  } 
  return affected;
};

// =====================================================

export const deleteFeedback = async feedbackId => {
  if (feedbackId) {
    await Feedbacks.deleteOne({ _id: feedbackId || ' ' });
  }
};

// =====================================================

export const deleteFeedbackImage = async feedbackImageId => {
  if (feedbackImageId) {
    const feedbackImage = await FeedbackImages
      .findOne({ _id: feedbackImageId })
      .lean();
    await FeedbackImages.deleteOne({ _id: feedbackImageId || ' ' });

    if (feedbackImage) {
      await deleteImage(feedbackImage.imageId);
    }
  }
};
