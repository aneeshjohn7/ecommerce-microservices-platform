import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../errors/AppError';

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  profile = asyncHandler(async (req: Request, res: Response) => {
    //res.status(200).json({ message: req.headers.authorization });
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }
    const userProfile = await this.profileService.getUserProfile(userId);
    res.status(200).json(userProfile);
  });
}
