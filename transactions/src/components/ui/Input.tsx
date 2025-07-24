import React from "react";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "secondary";
}

const VARIANT_CLASSES = {
  primary: "campo-input",
  secondary: "input-secoundary",
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "primary", ...props }, ref) => {
    return (
      <div className={props.className || ""}>
        <input className={VARIANT_CLASSES[variant]} ref={ref} {...props} />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
