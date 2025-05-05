import express from 'express';
import { reviewController } from '../contollers/reviewController.js';
import { limiter } from '../middlewares/rateLimiter.js';
const router = express.Router();

router.get('/', reviewController.getAllReviews);

router.post('/', limiter, reviewController.addReview);

export default router;
