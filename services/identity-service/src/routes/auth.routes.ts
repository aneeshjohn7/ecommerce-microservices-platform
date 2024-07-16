import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { registerSchema } from '../schemas/auth.schema';
import { validate } from '../middleware/validate.middleware';
const router = Router();

router.post('/register', validate(registerSchema), (req, res) => {
  AuthController.register(req, res);
});

export default router;
