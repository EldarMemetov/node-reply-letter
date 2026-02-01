import brevoClient from './brevoClient.js';
import { templates } from './emailTemplates.js';
import { env } from './env.js';

const sendMail = async ({ to, subject, html }) => {
  await brevoClient.sendTransacEmail({
    sender: {
      email: env('BREVO_SENDER_EMAIL'),
      name: 'Qvrix',
    },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};

export const notifyAdmin = async (type, payload) => {
  const { subject, text } = templates[type].admin(payload);

  await sendMail({
    to: env('EMAIL_RECEIVER'),
    subject,
    html: `<pre style="font-family: sans-serif;">${text}</pre>`,
  });
};

export const sendUserReply = async (type, payload) => {
  const { subject, html } = templates[type].user(payload);

  await sendMail({
    to: payload.email,
    subject,
    html,
  });
};
