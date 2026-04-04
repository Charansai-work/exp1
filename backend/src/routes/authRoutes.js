import { Router } from 'express';
import { login, refresh, signup } from '../controllers/authController.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema, signupSchema } from '../utils/schemas.js';

const router = Router();
router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh);

export default router;
