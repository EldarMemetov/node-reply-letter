const allowedOrigins = [
  'http://localhost:3000',
  'https://web-studio-pied.vercel.app',
  'https://web-new-studio.vercel.app',
  'https://qvrix.studio',
  'https://www.qvrix.studio',
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log('CORS origin:', origin);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export default corsOptions;
