import { SlotStatus } from "./enums/SlotStatus";
import { User } from "./User";

export interface Slot {
  _id?: string;
  doctor?: User | null;
  startTime: Date;
  endTime: Date;
  status: SlotStatus;
}
