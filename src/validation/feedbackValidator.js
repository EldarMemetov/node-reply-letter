import Joi from 'joi';

export const validateFeedback = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required().messages({
      'string.min': 'Name must be at least 2 characters long',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email address',
      'any.required': 'Email is required',
    }),
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid phone number',
        'any.required': 'Phone number is required',
      }),
    message: Joi.string().min(5).required().messages({
      'string.min': 'Message must be at least 5 characters long',
      'any.required': 'Message is required',
    }),
  });

  return schema.validate(data);
};
