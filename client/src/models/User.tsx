import { UserRole } from "./enums/UserRole";

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: string;
}
