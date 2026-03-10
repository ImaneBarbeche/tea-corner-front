import {
  Home,
  BookOpen,
  Compass,
  ClipboardList,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { HTMLAttributes } from "react";
import { NavLink } from "react-router";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  library: BookOpen,
  discover: Compass,
  logs: ClipboardList,
  dashboard: LayoutDashboard,
  settings: Settings,
};

interface NavIconProps extends HTMLAttributes<HTMLElement> {
  icon: string;
  link: string;
  text: string;
  end?: boolean;
}

export function NavIcon({ icon, link, text, end, ...props }: NavIconProps) {
  const Icon = iconMap[icon.toLowerCase()];
  return (
    <NavLink to={link} end={end} className={`flex flex-col items-center ${props.className ?? ""}`}>
      {({ isActive }) => (
        <>
          <span
            className={`p-1.5 ${isActive ? "bg-primary-beige rounded-xl" : ""}`}
          >
            <Icon color="var(--color-primary-dark)" strokeWidth={1} size={36} />
          </span>
          <span className="text-xs mt-3 md:hidden">{text}</span>
        </>
      )}
    </NavLink>
  );
}
