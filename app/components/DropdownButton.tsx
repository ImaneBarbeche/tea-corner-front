import React, {
  useState,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";
import { EllipsisVertical } from "lucide-react";
import { DropdownMenu, type MenuItemProps } from "./DropdownMenu";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  color?: "";
  disabled?: boolean;
  icon?: ReactElement;
  children?: React.ReactNode;
  items: MenuItemProps[];
}

export function DropdownButton({
  variant = "ghost",
  size = "small",
  icon,
  items,
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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className={`${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
        {icon ?? <EllipsisVertical />}
      </button>
      {isOpen && <DropdownMenu items={items} />}
    </div>
  );
}
