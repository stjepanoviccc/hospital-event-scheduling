import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/User';
import JwtService from '../services/jwtService'; 

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      JwtService.clearTokens(); 
    },
  },
});

export const { setUser, setIsLoggedIn, logout } = authSlice.actions;
export default authSlice.reducer;
