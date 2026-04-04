import { Router } from 'express';
import { applyInternship, myApplications, updateApplicationStatus } from '../controllers/applicationController.js';
import { auth, authorize } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { applicationStatusSchema } from '../utils/schemas.js';

const router = Router();
router.post('/apply', auth, authorize('USER'), applyInternship);
router.get('/my', auth, authorize('USER'), myApplications);
router.put('/status', auth, authorize('ADMIN'), validate(applicationStatusSchema), updateApplicationStatus);

export default router;
