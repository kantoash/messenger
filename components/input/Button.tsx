import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  label?: string;
  fullWidth?: boolean;
  secondary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  fullWidth,
  secondary,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        `flex justify-center rounded-md px-3 py-2 text-sm font-semibold 
        focus-visible:outline focus-visible:outline-2 focus:outline-offset-2 
          text-white`,
        disabled && "opacity-50 cursor-default",
        secondary ? 'bg-gray-500 ' : 'bg-sky-500 ',
        fullWidth && "w-full"
      )}
    >
      {label}
    </button>
  );
};

export default Button;