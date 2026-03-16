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
    <ul className="absolute top-full z-10 mt-1 w-52 rounded-md bg-primary-light/80 ring-1 ring-black/5 py-1 shadow-card backdrop:backdrop-blur-2xl">
      {items.map((item) => (
        <li key={item.label}>
          <button
            type="button"
            onClick={item.onClick}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-secondary-dark"
          >
            {item.icon}
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
