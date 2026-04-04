import { Router } from 'express';
import { getMyNotifications, readNotifications } from '../controllers/notificationController.js';
import { auth } from '../middlewares/authMiddleware.js';

const router = Router();
router.get('/', auth, getMyNotifications);
router.put('/read', auth, readNotifications);

export default router;
