import { Router } from 'express';
import { dashboardMetrics } from '../controllers/analyticsController.js';
import { auth, authorize } from '../middlewares/authMiddleware.js';

const router = Router();
router.get('/dashboard', auth, authorize('ADMIN'), dashboardMetrics);

export default router;
