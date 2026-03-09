import {
  Home,
  BookOpen,
  Compass,
  ClipboardList,
  LayoutDashboard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  library: BookOpen,
  discover: Compass,
  logs: ClipboardList,
  dashboard: LayoutDashboard,
};

interface NavIconProps {
  icon: string;
  link: string;
  text: string;
  end?: boolean;
}

export function NavIcon({ icon, link, text, end }: NavIconProps) {
  const Icon = iconMap[icon.toLowerCase()];
  return (
    <NavLink to={link} end={end} className="flex flex-col items-center">
      {({ isActive }) => (
        <>
          <span
            className={
              `p-1.5 ${isActive ? "bg-primary-beige rounded-xl" : ""}`
            }
          >
            <Icon color="var(--color-primary-dark)" strokeWidth={1} size={36} />
          </span>
          <span className="text-xs mt-3">{text}</span>
        </>
      )}
    </NavLink>
  );
}
