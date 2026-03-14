import type { LucideIcon } from "lucide-react";
import React, { type ButtonHTMLAttributes, type ReactElement } from "react";

// allows the button to inherit standard button props (e.g type="submit")
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: "small" | "medium" | "large";
  color?: "";
  disabled?: boolean;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "medium",
  children,
  className = "",
  disabled,
  icon: Icon,
  ...props //spreading onClick etc
}: ButtonProps) {
  const variants = {
    primary:
      "text-sm px-6 py-2.5 bg-primary-dark text-primary-light hover:bg-opacity-90",
    secondary:
      "border-2 border-primary-dark text-secondary-dark bg-transparent",
    tertiary: "text-primary-dark bg-primary-beige",
    ghost: "bg-transparent text-primary-dark",
  };

  const sizes = {
    small: "px-4 py-1.5 text-xs",
    medium: "px-6 py-2.5 text-sm",
    large: "px-8 py-3 text-base",
  };

  const iconSizes = {
    small: 14,
    medium: 16,
    large: 24,
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer";

  const isIconOnly = !children && !!Icon;

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${isIconOnly ? "!px-2.5" : ""} ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {/* TODO: ICON & LINK */}

      {Icon && <Icon size={iconSizes[size]} className="" />}

      {children && <span>{children}</span>}
    </button>
  );
}
