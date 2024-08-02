import { Router } from 'express';
import { orderController } from '../container';
const router = Router();

router.post("/", orderController.createOrder);

export default router;
