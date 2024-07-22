import { Router } from 'express';
import { register, verifyEmail } from '../controllers/auth.controller';
import { registerSchema } from '../schemas/auth.schema';
import { validate } from '../middleware/validate.middleware';
import { verify } from 'node:crypto';
const router = Router();

router.post('/register', validate(registerSchema), register);

router.get('/verify-email', verifyEmail);

export default router;
