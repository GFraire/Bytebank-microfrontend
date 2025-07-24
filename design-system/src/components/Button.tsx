import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick 
}) => {
  const baseClasses = "px-4 py-2 rounded font-medium";
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-opacity-90",
    secondary: "bg-secondary text-white hover:bg-opacity-90"
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};