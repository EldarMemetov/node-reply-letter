import createError from 'http-errors';
import FeedbackLetter from '../db/models/Feedback.js';
import { validateFeedback } from '../validation/feedbackValidator.js';
import { notifyAdmin, sendUserReply } from '../utils/notificationService.js';
import { env } from '../utils/env.js';

export const sendFeedback = async (req, res, next) => {
  try {
    const { error } = validateFeedback(req.body);
    if (error) throw createError(400, error.details[0].message);

    const { name, email, message, agree, lang } = req.body;
    if (!agree) throw createError(400, 'You must agree to the privacy policy');

    const newFeedback = new FeedbackLetter({
      name,
      email,
      message,
      agree,
      lang,
    });
    const saved = await newFeedback.save();
    console.log('Feedback saved:', {
      id: saved._id,
      email: saved.email,
      name: saved.name,
    });

    const adminPayload = { name, email, message, lang };
    const userPayload = { name, email, lang };

    console.log(
      'Start sending emails — admin:',
      env('EMAIL_RECEIVER'),
      'user:',
      email,
    );
    const results = await Promise.allSettled([
      notifyAdmin('feedback', adminPayload),
      sendUserReply('feedback', userPayload),
    ]);

    results.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        console.log(
          `email ${i} sent successfully:`,
          r.value || '(no body returned)',
        );
      } else {
        console.error(
          `email ${i} failed:`,
          r.reason?.response?.data || r.reason?.message || r.reason,
        );
      }
    });

    res
      .status(201)
      .json({ message: '✅ Feedback received! We will reply shortly.' });
  } catch (err) {
    next(err);
  }
};
