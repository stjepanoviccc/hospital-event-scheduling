import { EventStatus } from "./enums/EventStatus";
import { Slot } from "./Slot";
import { User } from "./User";

export interface Event {
  _id: string;
  slot: Slot;
  patient: User | null;
  doctor: User | null;
  status: EventStatus;
  createdAt: string;
}
