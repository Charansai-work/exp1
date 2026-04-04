import { Router } from 'express';
import { me, updateProfile } from '../controllers/userController.js';
import { auth } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/upload.js';

const router = Router();
router.get('/me', auth, me);
router.put('/me', auth, upload.single('resume'), updateProfile);

export default router;
