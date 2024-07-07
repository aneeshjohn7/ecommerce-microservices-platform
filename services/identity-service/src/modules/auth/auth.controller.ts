import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const user = await AuthService.register(req.body);
  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const token = await AuthService.login(req.body);
  res.json({ token });
};