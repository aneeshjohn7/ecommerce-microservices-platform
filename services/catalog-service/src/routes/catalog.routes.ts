import { Router } from 'express';
import { catalogController } from '../container';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { validateProductId } from '../middleware/validateProductId.middleware';
const router = Router();

router.get('/:productId', validateProductId, catalogController.getProduct);

export default router; 
