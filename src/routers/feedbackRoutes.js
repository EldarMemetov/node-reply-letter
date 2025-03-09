import express from 'express';
import FeedbackLetter from '../db/models/Feedback.js';
import { validateFeedback } from '../validation/feedbackValidator.js';
import { sendMail } from '../utils/mailer.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

const sendFeedback = async (req, res) => {
  const { error } = validateFeedback(req.body);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const feedback = new FeedbackLetter(req.body);
  await feedback.save();

  await sendMail(req.body);

  res.status(201).json({ message: '✅ Feedback sent successfully!' });
};

router.post('/', ctrlWrapper(sendFeedback));

export default router;
