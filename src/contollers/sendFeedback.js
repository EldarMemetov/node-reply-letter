import { validateFeedback } from '../validation/feedbackValidator.js';
import { notifyAdmin, sendUserReply } from '../utils/notificationService.js';
import createError from 'http-errors';

export const sendFeedback = async (req, res, next) => {
  try {
    const { error } = validateFeedback(req.body);
    if (error) throw createError(400, error.details[0].message);

    const { name, email, message, agree, lang } = req.body;
    if (!agree) throw createError(400, 'You must agree to the privacy policy');

    try {
      await notifyAdmin('feedback', { name, email, message, lang });
    } catch (err) {
      console.error('🚨 notifyAdmin failed:', err);
      return res.status(500).json({
        message: 'Failed to send email to admin',
        error: err.message,
      });
    }

    try {
      await sendUserReply('feedback', { name, email, lang });
    } catch (err) {
      console.error('🚨 sendUserReply failed:', err);
      return res.status(500).json({
        message: 'Failed to send email to user',
        error: err.message,
      });
    }

    res
      .status(201)
      .json({ message: '✅ Feedback received! We will reply shortly.' });
  } catch (err) {
    next(err);
  }
};
