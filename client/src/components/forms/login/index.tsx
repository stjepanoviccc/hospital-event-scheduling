import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/button";
import { validateLogin } from "../../../utils/validators/userValidator";
import { handleAxiosError } from "../../../services/errorService";
import { login } from "../../../services/authService";
import { useDispatch } from "react-redux";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isFormValid =
    formData.email &&
    formData.password &&
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateLogin(formData);
    setValidationErrors(errors);

    try {
      const loginData = { email: formData.email, password: formData.password };
      await login(loginData, dispatch);
      setFormData({ email: "", password: "" });
      setErrorMsg("");
      navigate("/");
    } catch (error) {
      const errorMsg = handleAxiosError(error);
      setErrorMsg(errorMsg);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-y-6">
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
          Sign In
        </Button>
        <div className="flex flex-col items-center">
          <p className="p">No account?</p>
          <Link to="/register" className="text-primaryColor underline">
            Sign Up!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
