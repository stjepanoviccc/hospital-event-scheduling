import { UserRole } from "./enums/UserRole";

export interface LoginResponse {
    role: UserRole,
    accessToken: string,
    refreshToken: string,
  }
  