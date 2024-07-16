import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
export class AuthController {
  static async register(req: Request, res: Response) {
    
    const user = await AuthService.register(req.body);
    res.json(user);
  }
}
