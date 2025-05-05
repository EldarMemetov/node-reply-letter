// import express from 'express';
// import { sendFeedback } from '../contollers/sendFeedback.js';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';

// const router = express.Router();
// router.post('/', ctrlWrapper(sendFeedback));
// export default router;
import express from 'express';
import { sendFeedback } from '../contollers/sendFeedback.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { limiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/', limiter, ctrlWrapper(sendFeedback));

export default router;
