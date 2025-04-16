// import { Schema, model } from 'mongoose';

// const BlogPostSchema = new Schema(
//   {
//     title: {
//       en: { type: String, required: true },
//       de: { type: String, required: true },
//       ua: { type: String, required: true },
//     },
//     content: {
//       en: { type: String, required: true },
//       de: { type: String, required: true },
//       ua: { type: String, required: true },
//     },
//     image: { type: String, required: true },
//     theme: { type: String, enum: ['video', 'web'], required: true },
//     views: { type: Number, default: 0 },
//   },
//   { versionKey: false, timestamps: true },
// );

// const BlogPost = model('BlogPost', BlogPostSchema);

// export default BlogPost;
import { Schema, model } from 'mongoose';

const BlogPostSchema = new Schema(
  {
    title: {
      en: { type: String, required: true },
      de: { type: String, required: true },
      ua: { type: String, required: true },
    },
    content: {
      en: [
        {
          text: { type: String },
          heading: { type: String },
          ulContent: { type: [String] },
        },
      ],
      de: [
        {
          text: { type: String },
          heading: { type: String },
          ulContent: { type: [String] },
        },
      ],
      ua: [
        {
          text: { type: String },
          heading: { type: String },
          ulContent: { type: [String] },
        },
      ],
    },
    image: { type: String, required: true },
    theme: { type: String, enum: ['video', 'web'], required: true },
    views: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true },
);

const BlogPost = model('BlogPost', BlogPostSchema);

export default BlogPost;
