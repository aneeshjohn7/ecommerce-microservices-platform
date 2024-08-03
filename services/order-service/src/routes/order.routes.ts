import { Router } from 'express';
import { orderController } from '../container';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { orderSchema } from '../schemas/order.schema';
const router = Router();

router.post('/', authenticate, validate(orderSchema), orderController.createOrder);
//router.post('/', orderController.createOrder);

//router.get('/order', orderController.order);

export default router;
