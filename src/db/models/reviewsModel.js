import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    agree: {
      type: Boolean,
      required: true,
    },
    lang: {
      type: String,
      enum: ['ua', 'en', 'de'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false },
);

const Review = model('Review', ReviewSchema);

export default Review;
