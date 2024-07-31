import { Router } from 'express';
import { authController } from '../container';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { validate } from '../middleware/validate.middleware';
const router = Router();

router.post('/register', validate(registerSchema), authController.register);

router.post('/login', validate(loginSchema), authController.login);

router.get('/verify-email', authController.verifyEmail);

export default router;
