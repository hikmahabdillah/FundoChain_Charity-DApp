import type React from "react";
import type { ButtonProps } from "../../types/button";

const Button: React.FC<ButtonProps> = ({
  // functional component dan props sesuai dengan ButtonProps
  type,
  text = "Button",
  icon,
  className = "",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center py-2 px-5 gap-2 rounded-lg transition duration-200 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
