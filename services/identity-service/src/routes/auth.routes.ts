import { Router } from 'express';
import { register } from '../controllers/auth.controller';
import { registerSchema } from '../schemas/auth.schema';
import { validate } from '../middleware/validate.middleware';
const router = Router();

router.post('/register', validate(registerSchema), register);

export default router;
