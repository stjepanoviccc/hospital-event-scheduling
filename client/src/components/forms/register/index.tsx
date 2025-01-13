import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/button";
import { validateUser } from "../../../utils/validators/userValidator";
import { UserRole } from "../../../models/enums/UserRole";
import { register } from "../../../services/authService";
import { User } from "../../../models/User";
import { handleCustomError } from "../../../services/customErrorService/errorService";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: UserRole.PATIENT,
  });

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const navigate = useNavigate();
  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    formData.role &&
    Object.keys(validationErrors).length === 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorMsg("");
    setValidationErrors({});
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateUser(formData);
    setValidationErrors(errors);

    try {
      const registerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      await register(registerData);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: UserRole.PATIENT,
      });
      setErrorMsg("");
      navigate("/login");
    } catch (error) {
      const errorMsg = handleCustomError(error);
      setErrorMsg(errorMsg);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-y-6">
      <input
        className="input"
        placeholder="First Name"
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        required
      />
      {validationErrors.firstName && (
        <p className="text-dangerColor">{validationErrors.firstName}</p>
      )}

      <input
        className="input"
        placeholder="Last Name"
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        required
      />
      {validationErrors.lastName && (
        <p className="text-dangerColor">{validationErrors.lastName}</p>
      )}

      <input
        className="input"
        placeholder="Email"
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      {validationErrors.email && (
        <p className="text-dangerColor">{validationErrors.email}</p>
      )}

      <input
        className="input"
        placeholder="Password"
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      {validationErrors.password && (
        <p className="text-dangerColor">{validationErrors.password}</p>
      )}

      <div className="flex flex-row gap-4">
        <label>
          <input
            type="radio"
            name="role"
            value={UserRole.PATIENT}
            checked={formData.role === UserRole.PATIENT}
            onChange={handleInputChange}
            required
          />
          <span className="text-secondaryColor ml-1">Patient</span>
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value={UserRole.DOCTOR}
            checked={formData.role === UserRole.DOCTOR}
            onChange={handleInputChange}
            required
          />
          <span className="text-secondaryColor ml-1">Doctor</span>
        </label>
      </div>

      {validationErrors.role && (
        <p className="text-dangerColor">{validationErrors.role}</p>
      )}

      {Object.keys(validationErrors).length === 0 && errorMsg && (
        <p className="text-dangerColor">{errorMsg}</p>
      )}

      <div className="flex flex-row justify-between items-center">
        <Button
          className={`button-primary ${
            !isFormValid && "opacity-50 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!isFormValid}
        >
          Sign Up
        </Button>
        <div className="flex flex-col items-center">
          <p className="p ml-4">You have an account?</p>
          <Link to="/login" className="text-primaryColor underline">
            Sign In!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
