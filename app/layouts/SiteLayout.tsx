import { Outlet, NavLink } from "react-router";
import { Button } from "~/components/Button";
import { Logo } from "~/components/Logo";

export default function SiteLayout() {
  return (
    <>
      <header className="flex px-8 pt-8 justify-between max-w-7xl mx-auto w-full h-fit">
        {/* logo */}
        <Logo />
        <nav className="flex gap-4 justify-center w-full items-center">
          {/* <NavLink to="/" ml-auto>
            Home
          </NavLink> */}
          {/* <NavLink to="/app/" className="ml-auto">
            app home
          </NavLink> */}
          <Button className="ml-auto h-fit">
            <NavLink to="/signin">sign in</NavLink>
          </Button>
        </nav>
      </header>
      <main className="flex items-center pt-16 pb-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <footer className="flex flex-col gap-8 max-w-7xl mx-auto px-8 pb-8 mt-auto w-full md:flex-row md:gap-0 md:justify-between">
        <div className="flex justify-between md:gap-8">
          <NavLink to="">About us</NavLink>
          <NavLink to="">Help</NavLink>
        </div>
        <div className="text-center md:flex md:gap-8">
          <div className="flex justify-around md:gap-8">
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>
            <a href="/terms" className="underline">
              Terms of Service
            </a>
          </div>
          <p className="mt-2 md:mt-0">2026 tea corner. All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}
