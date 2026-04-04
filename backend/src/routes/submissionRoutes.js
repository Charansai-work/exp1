import { Router } from 'express';
import { listTaskSubmissions, submitTask } from '../controllers/submissionController.js';
import { auth } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/upload.js';

const router = Router();
router.post('/submit', auth, upload.single('file'), submitTask);
router.get('/task/:id', auth, listTaskSubmissions);

export default router;
