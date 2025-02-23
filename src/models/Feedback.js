import { Schema, model } from 'mongoose';

const FeedbackSchema = new Schema()(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const FeedbackLetter = model('letter', FeedbackSchema);

export default FeedbackLetter;
