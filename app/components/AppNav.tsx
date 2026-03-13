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

  const settings = {
    icon: "settings",
    link: "/app/settings",
    text: "Settings",
  };

  return (
    <nav className="px-6 py-5 bg-secondary-beige rounded-full shadow-card backdrop-blur-2xl mx-4 mb-2 fixed bottom-0 left-0 right-0 z-50 md:shadow-none md:top-0 md:bottom-0 md:right-auto md:bg-transparent md:p-0 md:m-0 md:pt-1.5 ">
      <div className="md:grid md:grid-rows-[auto_1fr_auto] md:h-full md:items-start md:gap-10">
        <div className="hidden md:block">
          <Logo />
        </div>
        <ul className="flex justify-between md:flex-col md:justify-between md:h-9/12 md:max-h-80">
          {navItems.map((item) => (
            <li key={item.icon}>
              <NavIcon {...item} />
            </li>
          ))}
        </ul>
        <NavIcon {...settings} className="hidden md:flex md:self-end" />
      </div>
    </nav>
  );
}
