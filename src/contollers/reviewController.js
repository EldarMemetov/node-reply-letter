import createError from 'http-errors';
import Review from '../db/models/reviewsModel.js';
import { FilterReviews } from '../services/reviewService.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { ReviewValidation } from '../validation/reviewValidation.js';

export const getAllReviews = async (req, res) => {
  const { sortOrder } = req.query;
  const reviews = await FilterReviews(sortOrder);
  res.json(reviews);
};

const addReview = async (req, res) => {
  const { error } = ReviewValidation(req.body);
  if (error) {
    throw createError(400, error.details[0].message);
  }

  const { name, email, text, agree } = req.body;

  if (!agree) {
    throw createError(400, 'You must agree to the privacy policy');
  }

  const newReview = new Review({ name, email, text });
  await newReview.save();
  res.status(201).json({ message: 'Review added', review: newReview });
};

export const reviewController = {
  getAllReviews: ctrlWrapper(getAllReviews),
  addReview: ctrlWrapper(addReview),
};
