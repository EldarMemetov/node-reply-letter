import nodemailer from 'nodemailer';
import { env } from '../utils/env.js';

export const sendMail = async ({ name, email, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env('EMAIL_USER'),
        pass: env('EMAIL_PASSWORD'),
      },
    });

    // Email settings
    const mailOptions = {
      from: `"Feedback Form" <${env('EMAIL_USER')}>`,
      to: env('EMAIL_RECEIVER'),
      subject: 'New message from the feedback form',
      text: `
        📩 New message from ${name}
        ✉ Email: ${email}
        💬 Message:
        ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Email successfully sent!');
  } catch (error) {
    console.error('Error while sending email:', error);
    throw new Error('Failed to send email');
  }
};
