import { NavLink } from "react-router";
import { Logo } from "./Logo";

export function AppNav() {
  return (
  <nav className="px-12 py-5 bg-secondary-beige rounded-full shadow-card backdrop-blur-2xl border-red-400 border-2 mx-4 mb-2 fixed bottom-0 left-0 right-0">
    <div className="">
        <div className="hidden">
            <Logo />
        </div>
        <ul className="flex justify-between">
            <li>Home</li>
            <li>Library</li>
            <li>Discover</li>
            <li>Logs</li>
            <li>Dashboard</li>
        </ul>
        <NavLink to="" className="hidden">Settings</NavLink>
    </div>
  </nav>
  );
}
