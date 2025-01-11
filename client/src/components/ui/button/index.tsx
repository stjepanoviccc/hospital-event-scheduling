import { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  disabled = false,
  type = "button",
  children,
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
