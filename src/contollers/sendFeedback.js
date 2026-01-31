import { validateFeedback } from '../validation/feedbackValidator.js';
import { notifyAdmin, sendUserReply } from '../utils/notificationService.js';
import createError from 'http-errors';

export const sendFeedback = async (req, res, next) => {
  try {
    const { error } = validateFeedback(req.body);
    if (error) throw createError(400, error.details[0].message);

    const { name, email, message, agree, lang } = req.body;
    if (!agree) throw createError(400, 'You must agree to the privacy policy');

    res
      .status(201)
      .json({ message: '✅ Feedback received! We will reply shortly.' });

    try {
      await notifyAdmin('feedback', { name, email, message, lang });
    } catch (err) {
      console.error('🚨 notifyAdmin failed:', err);
    }

    try {
      await sendUserReply('feedback', { name, email, lang });
    } catch (err) {
      console.error('🚨 sendUserReply failed:', err);
    }
  } catch (err) {
    next(err);
  }
};
