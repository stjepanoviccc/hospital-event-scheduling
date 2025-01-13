import axios from "../../config/axiosConfig";
import { Slot } from "../../models/Slot";

const baseUrl = '/api/v1/slots';

export const findSlotsByDoctorIdAndByDate = async (doctorId: string, date: string) => {
  try {
    const response = await axios.get(`${baseUrl}/doctors/${doctorId}/date/${date}`);
    const availableSlots = response.data.slots.availableSlots; 
    const bookedSlots = response.data.slots.bookedSlots; 
    return {
      availableSlots,
      bookedSlots
    };
  } catch (error) {
    console.error("Error during loading slots by patient: ", error);
    throw error;
  }
};

export const findAllSlotsByDoctor = async(): Promise<Slot[]> => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data.slots;
  } catch (error) {
    console.error("Error during loading slots by doctor: ", error);
    throw error;
  }
};

export const createSlot = async (slotData: Slot): Promise<Slot> => {
  try {
    const response = await axios.post(`${baseUrl}`, slotData);
    return response.data;
  } catch (error) {
    console.error("Error during create slot:", error);
    throw error;
  }
};