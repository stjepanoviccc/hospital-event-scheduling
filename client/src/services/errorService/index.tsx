import { AxiosError } from 'axios';

export const handleAxiosError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response && error.response.data && error.response.data.error) {
      return error.response.data.error;
    } else if (error.response && error.response.status === 401) {
      return "Unauthorized access. Please log in again."; 
    } else {
      return "An unexpected error occurred. Please try again.";
    }
  }
  
  return "An unknown error occurred."; 
};
