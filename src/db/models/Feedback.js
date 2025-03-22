import { Schema, model } from 'mongoose';

const FeedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    agree: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const FeedbackLetter = model('letter', FeedbackSchema);

export default FeedbackLetter;
