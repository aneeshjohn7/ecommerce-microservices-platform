import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt";

export class AuthService {
  static async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // save user in DB (pseudo)
    return {
      email: data.email,
    };
  }

  static async login(data: any) {
    // fetch user from DB (pseudo)
    const user = { id: "1", email: data.email, password: "hashed", role: "USER" };

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    return jwt.sign(
      { userId: user.id, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );
  }
}