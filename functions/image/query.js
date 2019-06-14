import { Images } from 'models';

export const getImage = async (query = {}) => {
  return await Images
    .findOne(query || { status: true })
    .lean();
};