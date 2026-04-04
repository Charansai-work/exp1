import { Router } from 'express';
import { getUserFeedback, giveFeedback } from '../controllers/feedbackController.js';
import { auth, authorize } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { feedbackSchema } from '../utils/schemas.js';

const router = Router();
router.post('/give', auth, authorize('ADMIN'), validate(feedbackSchema), giveFeedback);
router.get('/user/:id', auth, getUserFeedback);

export default router;
