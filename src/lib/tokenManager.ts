import jwt from 'jsonwebtoken';
import { TokenType } from '../@types';

export const generateToken = (payload: TokenType): string =>
  jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });

// eslint-disable-next-line @typescript-eslint/ban-types
export const decodeToken = (token: string): TokenType & { iat: number; exp: number } =>
  jwt.verify(token, process.env.JWT_SECRET as string) as TokenType & { iat: number; exp: number };
