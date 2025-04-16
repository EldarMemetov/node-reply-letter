// import Joi from 'joi';

// export const validateBlog = (data) => {
//   const schema = Joi.object({
//     title: Joi.object({
//       en: Joi.string().min(3).required().messages({
//         'string.min': 'English title must be at least 3 characters long',
//         'any.required': 'English title is required',
//       }),
//       de: Joi.string().min(3).required().messages({
//         'string.min': 'German title must be at least 3 characters long',
//         'any.required': 'German title is required',
//       }),
//       ua: Joi.string().min(3).required().messages({
//         'string.min': 'Ukrainian title must be at least 3 characters long',
//         'any.required': 'Ukrainian title is required',
//       }),
//     }),

//     content: Joi.object({
//       en: Joi.string().min(10).required().messages({
//         'string.min': 'English content must be at least 10 characters long',
//         'any.required': 'English content is required',
//       }),
//       de: Joi.string().min(10).required().messages({
//         'string.min': 'German content must be at least 10 characters long',
//         'any.required': 'German content is required',
//       }),
//       ua: Joi.string().min(10).required().messages({
//         'string.min': 'Ukrainian content must be at least 10 characters long',
//         'any.required': 'Ukrainian content is required',
//       }),
//     }),

//     image: Joi.string().uri().required().messages({
//       'string.uri': 'Image must be a valid URL',
//       'any.required': 'Image is required',
//     }),

//     theme: Joi.string().valid('video', 'web').required().messages({
//       'any.only': 'Theme must be either "video" or "web"',
//       'any.required': 'Theme is required',
//     }),
//   });

//   return schema.validate(data, { abortEarly: false });
// };
import Joi from 'joi';

export const validateBlog = (data) => {
  const schema = Joi.object({
    title: Joi.object({
      en: Joi.string().required(),
      de: Joi.string().required(),
      ua: Joi.string().required(),
    }).required(),
    content: Joi.object({
      en: Joi.array()
        .items(
          Joi.object({
            text: Joi.string().optional(),
            heading: Joi.string().optional(),
            ulContent: Joi.array().items(Joi.string()).optional(),
          }),
        )
        .required(),
      de: Joi.array()
        .items(
          Joi.object({
            text: Joi.string().optional(),
            heading: Joi.string().optional(),
            ulContent: Joi.array().items(Joi.string()).optional(),
          }),
        )
        .required(),
      ua: Joi.array()
        .items(
          Joi.object({
            text: Joi.string().optional(),
            heading: Joi.string().optional(),
            ulContent: Joi.array().items(Joi.string()).optional(),
          }),
        )
        .required(),
    }).required(),
    image: Joi.string().uri().required(),
    theme: Joi.string().valid('video', 'web').required(),
  });

  return schema.validate(data);
};
