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
