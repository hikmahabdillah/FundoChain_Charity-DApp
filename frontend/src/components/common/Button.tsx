import type React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  text: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
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
      className={`flex items-center justify-center py-2 px-5 gap-2 rounded-md transition duration-200 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
