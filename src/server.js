import express from 'express';
import cors from 'cors';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import { env } from './utils/env.js';
import feedbackRoutes from './routers/feedbackRoutes.js';
import reviewRoutes from './routers/reviewRoutes.js';
import logger from './middlewares/logger.js';
import corsOptions from './utils/corsOptions.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(logger);
  app.use(express.json());
  app.use(cors(corsOptions));

  app.use('/api/feedback', feedbackRoutes);
  app.use('/api/reviews', reviewRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
