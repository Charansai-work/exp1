import { Router } from 'express';
import { assignTask, completeTask, myTasks } from '../controllers/taskController.js';
import { auth, authorize } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { taskAssignSchema } from '../utils/schemas.js';

const router = Router();
router.post('/assign', auth, authorize('ADMIN'), validate(taskAssignSchema), assignTask);
router.get('/my', auth, myTasks);
router.put('/:id/complete', auth, authorize('USER'), completeTask);

export default router;
