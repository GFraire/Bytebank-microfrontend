import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "icon" | "danger";
}

const VARIANT_CLASSES = {
  primary: "btn",
  secondary: "btn-secoundary",
  outline: "btn-outline",
  icon: "btn-icon",
  danger: "btn-danger",
};

export default function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${VARIANT_CLASSES[variant]} ${props.className || ""} `.trim()}
    >
      {children}
    </button>
  );
}
