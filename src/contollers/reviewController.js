import createError from 'http-errors';
import Review from '../db/models/reviewsModel.js';
import { filterReviews } from '../services/reviewService.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const getAllReviews = async (req, res) => {
  const { sortOrder } = req.query;
  const reviews = await filterReviews(sortOrder);
  res.json(reviews);
};

const addReview = async (req, res) => {
  const { name, email, text } = req.body;

  if (!name || !email || !text) {
    throw createError(400, 'All fields are required');
  }

  const newReview = new Review({ name, email, text });
  await newReview.save();
  res.status(201).json({ message: 'Review added', review: newReview });
};

export const reviewController = {
  getAllReviews: ctrlWrapper(getAllReviews),
  addReview: ctrlWrapper(addReview),
};
