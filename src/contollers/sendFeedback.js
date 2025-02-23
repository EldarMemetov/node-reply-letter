import { validateFeedback } from '../validation/feedbackValidation.js';
import { sendEmail } from '../utils/emailService.js';

export const sendFeedback = async (req, res) => {
  const { error } = validateFeedback(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, email, phone, message } = req.body;

  try {
    await sendEmail(
      'your-email@gmail.com',
      'New message from the website',
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    );

    res.status(200).json({ message: 'Email successfully sent!' });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error sending email', details: err.message });
  }
};
