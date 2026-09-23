import type { User } from './user';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse extends User {
  token: string;
  refreshToken?: string;
}