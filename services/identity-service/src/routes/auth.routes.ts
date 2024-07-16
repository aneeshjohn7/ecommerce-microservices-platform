import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
const router = Router();

// Create route for registration
router.post('/register', (req, res) => {
  // create an instance of AuthController and call the register method
  AuthController.register(req, res);
});

export default router;
