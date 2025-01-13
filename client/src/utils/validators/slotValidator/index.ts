import { Slot } from "../../../models/Slot";
import { SlotStatus } from "../../../models/enums/SlotStatus";

interface ValidationError {
  [key: string]: string;
}

export const validateStartTime = (startTime: Date): string | null => {
  if (!startTime || isNaN(startTime.getTime())) {
    return "Start time is required and must be a valid date";
  }
  return null;
};

export const validateEndTime = (endTime: Date, startTime: Date): string | null => {
  if (!endTime || isNaN(endTime.getTime())) {
    return "End time is required and must be a valid date";
  }
  if (endTime <= startTime) {
    return "End time must be after start time";
  }
  return null;
};

export const validateStatus = (status: SlotStatus): string | null => {
  if (!status) {
    return "Status is required";
  }
  if (!Object.values(SlotStatus).includes(status)) {
    return `Status must be one of: ${Object.values(SlotStatus).join(", ")}`;
  }
  return null;
};

export const validateSlot = (slotData: Slot): ValidationError => {
  const errors: ValidationError = {};

  const startTimeError = validateStartTime(slotData.startTime);
  if (startTimeError) errors.startTime = startTimeError;

  const endTimeError = validateEndTime(slotData.endTime, slotData.startTime);
  if (endTimeError) errors.endTime = endTimeError;

  const statusError = validateStatus(slotData.status);
  if (statusError) errors.status = statusError;

  return errors;
};
