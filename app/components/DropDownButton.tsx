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
  useAnchor?: Boolean;
  disabled?: boolean;
  icon?: ReactElement;
  children?: React.ReactNode;
  items: MenuItemProps[];
}

export function DropDownButton({
  variant = "ghost",
  size = "small",
  icon,
  items,
  children,
  className = "",
  disabled,
  useAnchor,
  ...props //spreading onClick etc
}: ButtonProps) {
  const variants = {
    primary:
      "text-sm p-2.5 bg-primary-dark text-primary-light hover:bg-opacity-90",
    secondary: "border-2 border-primary-dark text-primary-dark bg-transparent",
    ghost: "bg-transparent text-primary-dark",
  };

  const sizes = {
    small: "text-xs",
    // medium: "px-6 py-2.5 text-sm",
    medium: " text-sm",
    large: "text-base",
  };

  let baseStyles = ``;

  if (useAnchor) {
    baseStyles =
      "fixed [position-anchor:var(--anchor-element)] top-[anchor(top)] right-[anchor(right)]";
  } else {
    baseStyles = "relative";
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${baseStyles}`}>
      <button
        className={`${variants[variant]} ${sizes[size]} ${className} `}
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
