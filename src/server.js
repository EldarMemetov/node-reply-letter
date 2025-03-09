import express from 'express';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

import cors from 'cors';
import { env } from './utils/env.js';
import feedbackRoutes from './routers/feedbackRoutes.js';
import logger from './middlewares/logger.js';
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use('/api', feedbackRoutes);
  app.use(logger);
  app.use(cors());
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => console.log('Server running on port 3000'));
};
