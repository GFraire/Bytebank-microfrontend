import React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: "primary" | "secondary";
  htmlFor: string;
  children?: React.ReactNode;
}

const VARIANT_CLASSES = {
  primary: "campo-label",
  secondary: "campo-label-secundary",
};

export default function Label({
  variant = "primary",
  htmlFor,
  children,
  ...props
}: LabelProps) {
  return (
    <label className={VARIANT_CLASSES[variant]} htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
}
