import { Router } from 'express';
import { catalogController } from '../container';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();

router.post('/:productId', authenticate, catalogController.getProduct);

export default router;
