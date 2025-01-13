import axios from "../../config/axiosConfig";
import JwtService from "../jwtService";
import { LoginResponse } from "../../models/LoginResponse";
import { LoginRequest } from "../../models/LoginRequest";
import { User } from "../../models/User";
import { Dispatch } from "redux";
import { setIsLoggedIn, setRole } from "../../store/authSlice";

const baseUrl = '/api/v1/auth';

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
    const { role, accessToken, refreshToken} = response.data;

    JwtService.setAccessToken(accessToken);
    JwtService.setRefreshToken(refreshToken);
    JwtService.setRole(role);

    dispatch(setIsLoggedIn(true));
    dispatch(setRole(role));

    return { role, accessToken, refreshToken };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};