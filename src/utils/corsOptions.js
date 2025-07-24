const allowedOrigins = [
  'http://localhost:3000',
  'https://your-production-domain.com',
  'https://web-studio-pied.vercel.app',
  'https://web-new-studio.vercel.app',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsOptions;
