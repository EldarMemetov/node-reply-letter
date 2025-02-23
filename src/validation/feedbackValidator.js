import Joi from 'joi';

export const validateFeedback = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required().messages({
      'string.min': 'Имя должно содержать минимум 2 символа',
      'any.required': 'Имя обязательно',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Некорректный email',
      'any.required': 'Email обязателен',
    }),
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required()
      .messages({
        'string.pattern.base': 'Некорректный номер телефона',
        'any.required': 'Телефон обязателен',
      }),
    message: Joi.string().min(5).required().messages({
      'string.min': 'Сообщение должно содержать минимум 5 символов',
      'any.required': 'Сообщение обязательно',
    }),
  });

  return schema.validate(data);
};
