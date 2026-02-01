import axios from 'axios';
import { templates } from './emailTemplates.js';
import { env } from './env.js';

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const payload = {
      sender: {
        name: 'Qvrix Support',
        email: env('SMTP_FROM'),
      },
      to: [{ email: to }],
      subject,
    };

    if (html) payload.htmlContent = html;
    if (text) payload.textContent = text;

    const res = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      payload,
      {
        headers: {
          'api-key': env('BREVO_API_KEY'),
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Brevo send response:', res.status, res.data);
    return res.data;
  } catch (err) {
    console.error(
      'sendEmail error:',
      err.response?.status,
      err.response?.data || err.message,
    );
    throw err;
  }
};

export const notifyAdmin = async (type, payload) => {
  const { subject, html, text } = templates[type].admin(payload);

  await sendEmail({
    to: env('EMAIL_RECEIVER'),
    subject,
    html,
    text,
  });
};

export const sendUserReply = async (type, payload) => {
  const { subject, html, text } = templates[type].user(payload);

  await sendEmail({
    to: payload.email,
    subject,
    html,
    text,
  });
};
