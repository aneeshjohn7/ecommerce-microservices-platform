import { UserRepository } from '../repositories/user.repository';
import { RoleRepository } from '../repositories/role.repository';
import { UserRoleRepository } from '../repositories/userRole.repository';

export class ProfileService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private userRoleRepository: UserRoleRepository,
  ) {}
  async getUserProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const roles = await this.userRoleRepository.findRolesByUserId(userId);
    const roleNames = roles.map((role) => role.role.name);

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      roles: roleNames,
    };
  }

}
