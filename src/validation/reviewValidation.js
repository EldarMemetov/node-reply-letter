import Joi from 'joi';

export const ReviewValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required().messages({
      'string.min': 'Name must be at least 2 characters long',
      'any.required': 'Name is required',
    }),
    text: Joi.string().min(5).required().messages({
      'string.min': 'Message must be at least 5 characters long',
      'any.required': 'Message is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email address',
      'any.required': 'Email is required',
    }),
    agree: Joi.boolean().valid(true).required().messages({
      'any.only': 'You must agree to the privacy policy',
      'any.required': 'Agreement to privacy policy is required',
    }),
  });
  return schema.validate(data);
};
