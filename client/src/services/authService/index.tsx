import axios from "axios";
import JwtService from "../jwtService";
import { LoginResponse } from "../../models/LoginResponse";
import { LoginRequest } from "../../models/LoginRequest";
import { User } from "../../models/User";
import { Dispatch } from "redux";
import { setUser, setIsLoggedIn } from "../../store/authSlice";

const baseUrl = '/api/v1/auth';

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = JwtService.getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  try {
    const response = await axios.post(`${baseUrl}/refresh-token`, { refreshToken });
    const newAccessToken = response.data.accessToken;
    JwtService.setAccessToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

export const register = async (registerData: User): Promise<User> => {
  try {
    const response = await axios.post(`${baseUrl}/register`, registerData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const login = async (
  loginData: LoginRequest,
  dispatch: Dispatch
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${baseUrl}/login`, loginData);
    const { accessToken, refreshToken, user: userData } = response.data;

    JwtService.setAccessToken(accessToken);
    JwtService.setRefreshToken(refreshToken);

    dispatch(setUser(userData));
    dispatch(setIsLoggedIn(true));

    return { user: userData, accessToken, refreshToken };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};