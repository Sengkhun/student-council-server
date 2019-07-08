import { Reports } from 'models';

// =====================================================

export const getReports = async ({ query, select, sort, limit, skip }) => {
  return await Reports
    .find(query || { status: true })
    .select(select)
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .lean();
};