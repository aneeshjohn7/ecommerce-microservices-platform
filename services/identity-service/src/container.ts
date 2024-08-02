 
import { UserRepository } from './repositories/user.repository';
import { RoleRepository } from './repositories/role.repository';
import { UserRoleRepository } from './repositories/userRole.repository';
import { RefreshTokenRepository } from './repositories/refreshToken.repository';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import prisma from './config/database';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';


// Repositories
const userRepository = new UserRepository(prisma);
const roleRepository = new RoleRepository(prisma);
const userRoleRepository = new UserRoleRepository(prisma);
const refreshTokenRepository = new RefreshTokenRepository(prisma);

// Services
const authService = new AuthService(
  userRepository,
  roleRepository,
  userRoleRepository,
  refreshTokenRepository
);

const profileService = new ProfileService(
  userRepository,
  roleRepository,
  userRoleRepository
);


// Controllers
export const authController = new AuthController(authService);
export const profileController = new ProfileController(profileService);