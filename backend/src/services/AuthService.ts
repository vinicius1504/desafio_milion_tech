import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '../config/env';
import { UnauthorizedError } from '../errors/AppError';

export interface LoginDTO {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    username: string;
  };
}

export interface TokenPayload {
  username: string;
  iat?: number;
  exp?: number;
}

export class AuthService {
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    const { username, password } = credentials;

    // Validate credentials against environment variables
    if (username !== env.admin.username || password !== env.admin.password) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken({ username });

    return {
      token,
      user: { username },
    };
  }

  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn as string,
    } as jwt.SignOptions);
  }

  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, env.jwt.secret) as TokenPayload;
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
