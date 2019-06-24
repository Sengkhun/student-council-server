import _ from 'lodash';
import { Feedbacks, FeedbackImages } from 'models';
import { getImage } from '/functions/image/query';

// =====================================================

export const getFeedback = async (query = {}) => {
  return await Feedbacks
    .findOne(query || { status: true })
    .lean();
};

// =====================================================

export const getFeedbackImages = async ({ query, sort } = {}) => {
  const feedbackImages = await FeedbackImages
    .find(query || { status: true })
    .sort(sort)
    .lean();

  let images = [];
  await Promise.all(
    images = _.map(feedbackImages, async ({ imageId, order }) => {
      const img = await getImage({ _id: imageId });
      images.push({ ...img, order });
    })
  );

  return images;
};

// =====================================================

export const getFirstFeedbackImage = async ({ query } = {}) => {
  const feedbackImage = await FeedbackImages
    .findOne(query || { status: true })
    .sort('order')
    .lean();

  if (feedbackImage) {
    const { imageId } = feedbackImage;
    const img = await getImage({ _id: imageId });
    return img;
  } else {
    return null;
  }
};
