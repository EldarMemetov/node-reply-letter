import { transporter } from './emailTransporter.js';
import { templates } from './emailTemplates.js';
import { env } from './env.js';

const sendMail = async ({ from, to, subject, text, html, attachments }) => {
  await transporter.sendMail({ from, to, subject, text, html, attachments });
};

export const notifyAdmin = async (type, payload) => {
  const { subject, text, html } = templates[type].admin(payload);
  await sendMail({
    from: `"Site Notification" <${env('EMAIL_USER')}>`,
    to: env('EMAIL_RECEIVER'),
    subject,
    text,
    html,
  });
};

export const sendUserReply = async (type, payload) => {
  const { subject, html, attachments } = templates[type].user(payload);
  await sendMail({
    from: `"Qvrix Support" <${env('EMAIL_USER')}>`,
    to: payload.email,
    subject,
    html,
    attachments,
  });
};
