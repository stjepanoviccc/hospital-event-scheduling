import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import JwtService from '../services/jwtService'; 
import { UserRole } from '../models/enums/UserRole';

interface AuthState {
  isLoggedIn: boolean;
  role: UserRole | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      JwtService.clearTokens();
      window.location.href = "/login"; 
    },
  },
});

export const { setIsLoggedIn, setRole, logout } = authSlice.actions;
export default authSlice.reducer;
