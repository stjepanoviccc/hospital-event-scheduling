import { Event } from "../../../models/Event";
import { EventStatus } from "../../../models/enums/EventStatus";
import { Slot } from "../../../models/Slot";

interface ValidationError {
  [key: string]: string;
}

export const validateSlot = (slot: Slot): string | null => {
  if (!slot) {
    return "Slot is required";
  }
  return null;
};

export const validateDoctor = (doctor: Event["doctor"]): string | null => {
  if (!doctor) {
    return "Doctor is required";
  }
  return null;
};

export const validateEventStatus = (status: EventStatus): string | null => {
  if (!status) {
    return "Status is required";
  }
  if (!Object.values(EventStatus).includes(status)) {
    return `Status must be one of: ${Object.values(EventStatus).join(", ")}`;
  }
  return null;
};

export const validateEvent = (eventData: Event): ValidationError => {
  const errors: ValidationError = {};

  const slotError = validateSlot(eventData.slot);
  if (slotError) errors.slot = slotError;

  const doctorError = validateDoctor(eventData.doctor);
  if (doctorError) errors.doctor = doctorError;

  const statusError = validateEventStatus(eventData.status);
  if (statusError) errors.status = statusError;

  return errors;
};
