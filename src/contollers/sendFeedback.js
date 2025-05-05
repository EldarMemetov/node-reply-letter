// import { validateFeedback } from '../validation/feedbackValidator.js';
// import { notifyAdmin, sendUserReply } from '../utils/notificationService.js';
// import createError from 'http-errors';

// export const sendFeedback = async (req, res) => {
//   const { error } = validateFeedback(req.body);
//   if (error) throw createError(400, error.details[0].message);

//   const { name, email, message, agree, lang } = req.body;
//   if (!agree) throw createError(400, 'You must agree to the privacy policy');

//   await notifyAdmin('feedback', { name, email, message, lang });

//   await sendUserReply('feedback', { name, email, lang });

//   res
//     .status(201)
//     .json({ message: '✅ Feedback sent and auto-reply delivered!' });
// };

import { validateFeedback } from '../validation/feedbackValidator.js';
import { notifyAdmin, sendUserReply } from '../utils/notificationService.js';
import createError from 'http-errors';
import { verifyCaptcha } from '../utils/verifyCaptcha.js';

export const sendFeedback = async (req, res) => {
  const { error } = validateFeedback(req.body);
  if (error) throw createError(400, error.details[0].message);

  const { name, email, message, agree, lang, captchaToken, botField } =
    req.body;

  // 1. Проверка на бота с помощью Honeypot (скрытое поле)
  if (botField && botField.trim() !== '') {
    throw createError(400, 'Bot detected');
  }

  // 2. Проверка CAPTCHA
  await verifyCaptcha(captchaToken); // Добавляем проверку CAPTCHA

  // 3. Проверка согласия с политикой конфиденциальности
  if (!agree) throw createError(400, 'You must agree to the privacy policy');

  // 4. Отправка уведомлений
  await notifyAdmin('feedback', { name, email, message, lang });
  await sendUserReply('feedback', { name, email, lang });

  // 5. Ответ клиенту
  res
    .status(201)
    .json({ message: '✅ Feedback sent and auto-reply delivered!' });
};
