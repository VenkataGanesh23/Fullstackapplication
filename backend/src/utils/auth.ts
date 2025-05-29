import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET!;
const RESET_PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET!; 

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (userId: number) => {
  // console.log(JWT_SECRET)
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

export const createResetToken = (userId: number) => {
  return jwt.sign({ userId }, RESET_PASSWORD_SECRET, { expiresIn: '15m' });
};

export const verifyResetToken = (token: string): { userId: number } => {
  return jwt.verify(token, RESET_PASSWORD_SECRET) as { userId: number };
};