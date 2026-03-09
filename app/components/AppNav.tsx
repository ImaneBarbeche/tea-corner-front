import { NavLink } from "react-router";
import { Logo } from "./Logo";
import { NavIcon } from "./NavIcon";

export function AppNav() {
  const navItems = [
    { icon: "home", link: "/app", text: "Home", end: true },
    { icon: "library", link: "/app/library", text: "Library" },
    { icon: "discover", link: "/app/discover", text: "Discover" },
    { icon: "logs", link: "/app/logs", text: "Logs" },
    { icon: "dashboard", link: "/app/dashboard", text: "Dashboard" },
  ];
  return (
    <nav className="px-6 py-5 bg-secondary-beige rounded-full shadow-card backdrop-blur-2xl mx-4 mb-2 fixed bottom-0 left-0 right-0">
      <div className="">
        <div className="hidden">
          <Logo />
        </div>
        <ul className="flex justify-between">
            {navItems.map((item) => (
                <li key={item.icon}>
                    <NavIcon {...item} />
                </li>
            ))}
        </ul>
        <NavLink to="" className="hidden">
          Settings
        </NavLink>
      </div>
    </nav>
  );
}
