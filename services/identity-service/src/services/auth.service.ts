import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
//import prisma client instance from database.ts
import prisma from "../config/database";
export class AuthService {
  static async register(userData: any) {
    // creare an instance of UserRepository
    const userRepository = new UserRepository(prisma);
    // Here you would typically validate the userData and hash the password
    const { firstName, lastName, email, password } = userData;

    // Hash the password using bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create the user in the database using the given fields 
    const user = await userRepository.create({
      email,
      firstName,
      lastName,
      phone: null,
      passwordHash,
      status: "active",
      emailVerified: false,
    });

    return user;
  }
}   