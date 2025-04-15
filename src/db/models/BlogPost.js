import { Schema, model } from 'mongoose';

const BlogPostSchema = new Schema(
  {
    title: {
      en: { type: String, required: true },
      de: { type: String, required: true },
      ua: { type: String, required: true },
    },
    content: {
      en: { type: String, required: true },
      de: { type: String, required: true },
      ua: { type: String, required: true },
    },
    image: { type: String, required: true },

    theme: { type: String, enum: ['video', 'web'], required: true },

    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: true },
);
const BlogPost = model('BlogPost', BlogPostSchema);

export default BlogPost;
