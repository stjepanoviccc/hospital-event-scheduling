import { SlotStatus } from "./enums/SlotStatus";
import { User } from "./User";

export interface Slot {
  _id: string;
  doctor: User;
  startTime: string;
  endTime: string;
  status: SlotStatus;
}
