import { UserRole } from "../../models/enums/UserRole";

const JwtService = {
    ACCESS_TOKEN_KEY: 'accessToken',
    REFRESH_TOKEN_KEY: 'refreshToken',
    ROLE_KEY: 'role',
  
    getAccessToken(): string | null {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY)
    },
  
    getRefreshToken(): string | null {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY)
    },

    getRole(): string | null {
      return localStorage.getItem(this.ROLE_KEY);
    },
  
    setAccessToken(token: string): void {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token)
    },
  
    setRefreshToken(token: string): void {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token)
    },

    setRole(role: UserRole): void {
      localStorage.setItem(this.ROLE_KEY, role);
    },
  
    clearTokens(): void {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.ROLE_KEY);
    }
  };
  
  export default JwtService