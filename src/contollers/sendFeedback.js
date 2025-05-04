import { validateFeedback } from '../validation/feedbackValidator.js';
import { notifyAdmin, sendUserReply } from '../utils/notificationService.js';
import createError from 'http-errors';

export const sendFeedback = async (req, res) => {
  const { error } = validateFeedback(req.body);
  if (error) throw createError(400, error.details[0].message);

  const { name, email, message, agree, lang } = req.body;
  if (!agree) throw createError(400, 'You must agree to the privacy policy');

  await notifyAdmin('feedback', { name, email, message, lang });

  await sendUserReply('feedback', { name, email, lang });

  res
    .status(201)
    .json({ message: '✅ Feedback sent and auto-reply delivered!' });
};
