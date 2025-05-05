// import createError from 'http-errors';
// import Review from '../db/models/reviewsModel.js';
// import { FilterReviews } from '../services/reviewService.js';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { ReviewValidation } from '../validation/reviewValidation.js';
// import { notifyAdmin, sendUserReply } from '../utils/notificationService.js';

// export const getAllReviews = async (req, res) => {
//   const { sortOrder } = req.query;
//   const reviews = await FilterReviews(sortOrder);
//   res.json(reviews);
// };

// const addReview = async (req, res) => {
//   const { error } = ReviewValidation(req.body);
//   if (error) {
//     throw createError(400, error.details[0].message);
//   }

//   const { name, email, text, rating, agree, lang } = req.body;

//   if (!agree) {
//     throw createError(400, 'You must agree to the privacy policy');
//   }

//   const newReview = new Review({ name, email, text, rating, agree, lang });
//   await newReview.save();

//   await notifyAdmin('review', { name, email, review: text, rating, lang });

//   await sendUserReply('review', { name, email, lang });

//   res.status(201).json({ message: 'Review added', review: newReview });
// };

// export const reviewController = {
//   getAllReviews: ctrlWrapper(getAllReviews),
//   addReview: ctrlWrapper(addReview),
// };
import createError from 'http-errors';
import Review from '../db/models/reviewsModel.js';
import { FilterReviews } from '../services/reviewService.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { ReviewValidation } from '../validation/reviewValidation.js';
import { notifyAdmin, sendUserReply } from '../utils/notificationService.js';
import { verifyCaptcha } from '../utils/verifyCaptcha.js';

export const getAllReviews = async (req, res) => {
  const { sortOrder } = req.query;
  const reviews = await FilterReviews(sortOrder);
  res.json(reviews);
};

const addReview = async (req, res) => {
  // 1. Проверка валидности данных
  const { error } = ReviewValidation(req.body);
  if (error) {
    throw createError(400, error.details[0].message);
  }

  const { name, email, text, rating, agree, lang, captchaToken, botField } =
    req.body;

  // 2. Honeypot: если скрытое поле заполнено — бот
  if (botField && botField.trim() !== '') {
    throw createError(400, 'Bot detected');
  }

  // 3. CAPTCHA проверка
  await verifyCaptcha(captchaToken); // Добавляем проверку CAPTCHA

  // 4. Проверка согласия с политикой
  if (!agree) {
    throw createError(400, 'You must agree to the privacy policy');
  }

  // 5. Создание нового отзыва
  const newReview = new Review({ name, email, text, rating, agree, lang });
  await newReview.save();

  // 6. Уведомление администратора о новом отзыве
  await notifyAdmin('review', { name, email, review: text, rating, lang });

  // 7. Ответ пользователю
  await sendUserReply('review', { name, email, lang });

  // 8. Ответ клиенту с подтверждением
  res.status(201).json({ message: 'Review added', review: newReview });
};

export const reviewController = {
  getAllReviews: ctrlWrapper(getAllReviews),
  addReview: ctrlWrapper(addReview),
};
