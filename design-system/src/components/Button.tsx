import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  outlined?: boolean;
  icon?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
}) => {
  const baseClasses = "px-4 rounded-lg font-medium h-12";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-opacity-90",
    secondary: "bg-secondary text-white hover:bg-opacity-90",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
