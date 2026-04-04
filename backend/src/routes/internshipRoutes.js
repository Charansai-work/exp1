import { Router } from 'express';
import { createInternship, deleteInternship, listInternships, updateInternship } from '../controllers/internshipController.js';
import { auth, authorize } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { internshipSchema } from '../utils/schemas.js';

const router = Router();
router.get('/', listInternships);
router.post('/', auth, authorize('ADMIN'), validate(internshipSchema), createInternship);
router.put('/:id', auth, authorize('ADMIN'), updateInternship);
router.delete('/:id', auth, authorize('ADMIN'), deleteInternship);

export default router;
