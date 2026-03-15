import React, { type InputHTMLAttributes, type ReactElement } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "secondary" | "ghost";
  //   size?: "small" | "medium" | "large";
  color?: "";
  disabled?: boolean;
  icon?: ReactElement;
}

export function Input({
  variant = "primary",
  //   size = "medium",
  icon,
  className = "",
  disabled,
  ...props //spreading onClick etc
}: InputProps) {
  const variants = {
    primary:
      "text-sm px-6 py-2.5 bg-primary-dark text-primary-light hover:bg-opacity-90",
    secondary: "border-2 border-primary-dark text-primary-dark bg-transparent",
    ghost: "bg-transparent text-primary-dark",
  };

  const sizes = {
    small: "px-4 py-1.5 text-xs",
    medium: "px-6 py-2.5 text-sm",
    large: "px-8 py-3 text-base",
  };

  const baseStyles =
    // "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer";
    "px-4 py-2.5 bg-transparent text-primary-dark border-2 border-primary-dark rounded-full  focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1";

  return (
    <input
      className={`${baseStyles} ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    />
  );
}
