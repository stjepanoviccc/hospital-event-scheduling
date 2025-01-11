const JwtService = {
    ACCESS_TOKEN_KEY: 'accessToken',
    REFRESH_TOKEN_KEY: 'refreshToken',
    USER_KEY: 'user',
  
    getAccessToken(): string | null {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY)
    },
  
    getRefreshToken(): string | null {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY)
    },
  
    setAccessToken(token: string): void {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token)
    },
  
    setRefreshToken(token: string): void {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token)
    },
  
    clearTokens(): void {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY)
      localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    }
  };
  
  export default JwtService