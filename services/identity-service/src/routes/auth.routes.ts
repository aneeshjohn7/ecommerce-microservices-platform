import { Router } from 'express';
import { authController, profileController } from '../container';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();

router.post('/register', validate(registerSchema), authController.register);

router.post('/login', validate(loginSchema), authController.login);

router.get('/verify-email', authController.verifyEmail);

router.get('/profile', authenticate, profileController.profile);

export default router;
