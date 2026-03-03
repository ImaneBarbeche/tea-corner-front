import React, { type ButtonHTMLAttributes, type ReactElement } from "react";

// allows the button to inherit standard button props (e.g type="submit")
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  color?: "";
  disabled?: boolean;
  icon?: ReactElement;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "medium",
  icon,
  children,
  className = "",
  disabled,
  ...props //spreading onClick etc
}: ButtonProps) {
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
    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {/* TODO: ICON & LINK */}
      {children}
    </button>
  );
}
