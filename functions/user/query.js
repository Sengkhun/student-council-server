import { Users } from 'models';

// =====================================================

export const getUser = async (query = {}) => {
  return await Users
    .findOne(query || { status: true })
    .lean();
};