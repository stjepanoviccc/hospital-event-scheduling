import axios from "../../config/axiosConfig";
import { Event } from "../../models/Event";

const baseUrl = '/api/v1/events';

export const findAllEventsByPatient = async (): Promise<{PENDING: Event[], APPROVED: Event[], REJECTED: Event[]}> => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data.events;
  } catch (error) {
    console.error("Error during find events by patient:", error);
    throw error;
  }
};

export const findAllEventsByDoctor = async (): Promise<Event[]> => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data.events;
  } catch (error) {
    console.error("Error during find events by doctor:", error);
    throw error;
  }
};

export const createEvent = async (slotId: string): Promise<Event> => {
  try {
    const response = await axios.post(`${baseUrl}`, {slotId});
    return response.data;
  } catch (error) {
    console.error("Error during create event:", error);
    throw error;
  }
};

export const updateEventStatus = async (eventId: string, status: string): Promise<Event> => {
  try {
    const response = await axios.put(`${baseUrl}`, {eventId, status});
    return response.data.events;
  } catch (error) {
    console.error("Error during update event status:", error);
    throw error;
  }
}