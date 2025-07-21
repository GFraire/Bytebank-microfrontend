import React from "react";

export interface SeparadorProps {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const VARIANT_CLASSES = {
  primary: "bg-cinza",
  secondary: "bg-verde",
};

const SIZE_CLASSES = {
  small: "w-18",
  medium: "w-32",
  large: "w-40",
};

export function Separador({
  variant = "primary",
  size = "medium",
}: SeparadorProps) {
  return (
    <hr
      className={
        "h-0.5 border-0 rounded-sm my-2 " +
        VARIANT_CLASSES[variant] +
        " " +
        SIZE_CLASSES[size]
      }
    />
  );
}
