import ReviewSchema from '../db/models/reviewsModel.js';

export const FilterReviews = async (sortOrder = 'desc') => {
  const sortDirection = sortOrder === 'asc' ? 1 : -1;
  return await ReviewSchema.find().sort({ createdAt: sortDirection });
};
