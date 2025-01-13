import axios from "../../config/axiosConfig";
import { Doctor } from "../../models/Doctor";

const doctorBaseUrl = '/api/v1/doctors';

export const findAllDoctors = async(): Promise<Doctor[]> => {
  try {
    const response = await axios.get(doctorBaseUrl);
    return response.data.doctors;
  } catch (error) {
    console.error("Error during loading doctors: ", error);
    throw error;
  }
};