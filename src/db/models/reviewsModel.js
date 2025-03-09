import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const ReviewLetter = model('review', ReviewSchema);

export default ReviewLetter;
