import { api } from './api';
import { LoginCredentials, AuthResponse, ApiResponse } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data.data;
  },

  async validateToken(): Promise<boolean> {
    try {
      const response = await api.get<ApiResponse<{ valid: boolean }>>('/auth/validate');
      return response.data.data.valid;
    } catch {
      return false;
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  setToken(token: string): void {
    localStorage.setItem('token', token);
  },

  getUser(): string | null {
    return localStorage.getItem('user');
  },

  setUser(user: string): void {
    localStorage.setItem('user', user);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
