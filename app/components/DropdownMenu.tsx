import { type ReactElement } from "react";

export interface MenuItemProps {
  label: string;
  icon?: ReactElement;
  onClick: () => void;
}

interface DropdownMenuProps {
  items: MenuItemProps[];
}

export function DropdownMenu({ items }: DropdownMenuProps) {
  return (
    <ul className="dropdown menu p-2.5 rounded-box bg-base-100 shadow-sm absolute top-full right-0">
      {items.map((item) => (
        <li key={item.label}>
          <button type="button" onClick={item.onClick}>
            {item.icon}
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
