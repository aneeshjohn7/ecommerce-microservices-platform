import { SignOptions } from "jsonwebtoken";

export const jwtConfig = {
  secret: process.env.JWT_SECRET!,
  expiresIn: "1h" as SignOptions["expiresIn"]
};