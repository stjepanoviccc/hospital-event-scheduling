import { EventStatus } from "./enums/EventStatus";
import { Slot } from "./Slot";
import { User } from "./User";
import { Doctor } from "./Doctor";

export interface Event {
  _id?: string;
  slot: Slot;
  patient?: User | null;
  doctor: Doctor;
  status: EventStatus;
  createdAt?: string;
}
