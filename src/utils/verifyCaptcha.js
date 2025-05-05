import axios from 'axios';
import createError from 'http-errors';
import { env } from './env.js';

export const verifyCaptcha = async (captchaToken) => {
  if (!captchaToken) {
    throw createError(400, 'Missing CAPTCHA token');
  }

  const secretKey = env('RECAPTCHA_SECRET_KEY');
  const captchaURL = 'https://www.google.com/recaptcha/api/siteverify';

  try {
    const { data } = await axios.post(captchaURL, null, {
      params: {
        secret: secretKey,
        response: captchaToken,
      },
    });

    if (!data.success || (data.score !== undefined && data.score < 0.5)) {
      throw createError(400, 'Failed CAPTCHA verification');
    }
  } catch (err) {
    throw createError(500, 'CAPTCHA validation error');
  }
};
