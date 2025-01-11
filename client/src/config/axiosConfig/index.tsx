import Axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { refreshAccessToken } from '../../services/authService'
import JwtService from '../../services/jwtService'

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean
}

export const axios = Axios.create({
  baseURL: "http://localhost:80",
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

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  const originalRequest = error.config as AxiosRequestConfigWithRetry
  if (error.response && error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true
    try {
        const newAccessToken = await refreshAccessToken()
        
        JwtService.setAccessToken(newAccessToken!)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken
  
        return axios(originalRequest)
      } catch (error) {
        return Promise.reject(error)
      }
  }
  return Promise.reject(error)
}

axios.interceptors.request.use(onRequest, onRequestError)

export default axios