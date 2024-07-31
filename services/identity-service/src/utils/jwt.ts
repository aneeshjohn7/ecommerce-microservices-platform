import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export const generateAccessToken = (payload: object): string => {
    console.log("Hiii",config.jwtConfig.accessTokenSecret);

    

  return jwt.sign(payload, config.jwtConfig.accessTokenSecret, { expiresIn: config.jwtConfig.accessTokenExpiresIn });
};

export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, config.jwtConfig.refreshTokenSecret, { expiresIn: config.jwtConfig.refreshTokenExpiresIn });
};