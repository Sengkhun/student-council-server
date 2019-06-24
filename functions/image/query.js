import { Images } from 'models';

// =====================================================

export const getImage = async (query = {}) => {
  return await Images
    .findOne(query || { status: true })
    .lean();
};

// =====================================================

export const deleteImage = async imageId => {
  if (imageId) {
    await Images.deleteOne({ _id: imageId || ' ' });
  }
};