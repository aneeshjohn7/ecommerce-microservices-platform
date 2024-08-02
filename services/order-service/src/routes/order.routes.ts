import { Router } from 'express';
import { orderController } from '../container';
import { validate } from '../middleware/validate.middleware';
import { orderSchema } from '../schemas/order.schema';
const router = Router();

router.post('/create', validate(orderSchema), orderController.createOrder);

router.get('/order', orderController.order);

export default router;
