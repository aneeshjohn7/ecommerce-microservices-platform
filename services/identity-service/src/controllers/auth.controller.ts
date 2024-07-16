import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
export class AuthController {
  /**
   * Handles user registration.
   * @param req - The request object containing user data.
   * @param res - The response object to send the result.
   */   
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
