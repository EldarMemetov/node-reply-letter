const allowedOrigins = [
  'http://localhost:3000',
  'https://web-studio-pied.vercel.app',
  'https://web-new-studio.vercel.app',
  'https://qvrix.studio',
  'https://www.qvrix.studio',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked origin: ${origin}`));
    }
  },
  credentials: true,
};

export default corsOptions;
