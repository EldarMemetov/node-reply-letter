import express from 'express';
import FeedbackLetter from '../models/Feedback.js';
import { validateFeedback } from '../validation/feedbackValidator.js';
import { sendMail } from '../utils/mailer.js';

const router = express.Router();

router.post('/feedback', async (req, res) => {
  const { error } = validateFeedback(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const feedback = new FeedbackLetter(req.body);
    await feedback.save();

    await sendMail(req.body);

    res.status(201).json({ message: '✅ Feedback sent successfully!' });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error while sending feedback', details: err.message });
  }
});

export default router;
