import { UserRole } from "../../../models/enums/UserRole";
import { User } from "../../../models/User";
import { LoginRequest } from "../../../models/LoginRequest";

interface ValidationError {
  [key: string]: string;
}

export const validateFirstName = (firstName: string): string | null => {
  if (!firstName) {
    return "First name is required";
  }
  return null;
};

export const validateLastName = (lastName: string): string | null => {
  if (!lastName) {
    return "Last name is required";
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return "Email is required";
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
};

export const validateRole = (role: UserRole): string | null => {
  if (!role) {
    return "Role is required";
  }
  if (!Object.values(UserRole).includes(role)) {
    return `Role must be one of: ${Object.values(UserRole).join(", ")}`;
  }
  return null;
};

export const validateUser = (userData: User): ValidationError => {
  const errors: ValidationError = {};

  const firstNameError = validateFirstName(userData.firstName);
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateLastName(userData.lastName);
  if (lastNameError) errors.lastName = lastNameError;

  const emailError = validateEmail(userData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(userData.password!);
  if (passwordError) errors.password = passwordError;

  const roleError = validateRole(userData.role);
  if (roleError) errors.role = roleError;

  return errors;
};

export const validateLogin = (loginData: LoginRequest): ValidationError => {
  const errors: ValidationError = {};

  const emailError = validateEmail(loginData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(loginData.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};
