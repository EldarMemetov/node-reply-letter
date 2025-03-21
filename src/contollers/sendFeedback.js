import createError from 'http-errors';
import { validateFeedback } from '../validation/feedbackValidation.js';
import { sendEmail } from '../utils/emailService.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const sendFeedback = async (req, res) => {
  const { error } = validateFeedback(req.body);
  if (error) {
    throw createError(400, error.details[0].message);
  }

  const { name, email, message } = req.body;

  await sendEmail(
    'your-email@gmail.com',
    'New message from the website',
    `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  );

  res.status(200).json({ message: 'Email successfully sent!' });
};

export default ctrlWrapper(sendFeedback);
