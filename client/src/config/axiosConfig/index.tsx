import Axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import JwtService from '../../services/jwtService'

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
})

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const accessToken = JwtService.getAccessToken()
  const refreshToken = JwtService.getRefreshToken()

  if (accessToken) {
    config.headers = config.headers || {}
    config.headers['Authorization'] = `Bearer ${accessToken}`
    config.headers['Cache-Control'] = 'no-cache'
    config.headers['x-refresh-token'] = refreshToken
  }
  return config
}

const onResponse = async (response: AxiosResponse): Promise<AxiosResponse> => {
  const newAccessToken = response.headers['x-access-token'];
  const newRefreshToken = response.headers['x-refresh-token'];

  if (newAccessToken) {
    JwtService.setAccessToken(newAccessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  }
  if (newRefreshToken) {
    JwtService.setRefreshToken(newRefreshToken);
    axios.defaults.headers.common['x-refresh-token'] = newRefreshToken;
  }

  return response;
}

axios.interceptors.request.use(onRequest, (error) => Promise.reject(error))
axios.interceptors.response.use(onResponse, (error) => Promise.reject(error))

export default axios