import express from 'express';
import { validateFeedback } from '../validation/feedbackValidator.js';
import { sendMail } from '../utils/mailer.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import createError from 'http-errors';

const router = express.Router();

const sendFeedback = async (req, res) => {
  const { error } = validateFeedback(req.body);
  if (error) {
    throw createError(400, error.details[0].message);
  }

  await sendMail(req.body);

  res.status(201).json({ message: '✅ Feedback sent successfully!' });
};

router.post('/', ctrlWrapper(sendFeedback));

export default router;
