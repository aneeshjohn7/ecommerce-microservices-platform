import { SignOptions } from "jsonwebtoken";

export const jwtConfig = {
  secret: process.env.JWT_SECRET!,
  accessTokenExpiresIn: "1h" as SignOptions["expiresIn"],
  refreshTokenExpiresIn: "7d" as SignOptions["expiresIn"]
};