declare namespace Express {
  export interface Request {
    userId?: string;
    user?: {
      username: string;
      role: string;
    };
  }
}
