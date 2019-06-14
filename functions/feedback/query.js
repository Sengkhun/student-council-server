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
      return { ...img, order };
    })
  );

  return images;
};
