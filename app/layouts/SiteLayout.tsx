import { Outlet, NavLink } from "react-router";

export default function SiteLayout() {
  return (
    <>
      <header className="flex px-8 justify-between max-w-7xl mx-auto w-full h-fit">
        {/* logo */}
        <div>logo</div>
        <nav className="flex gap-4 justify-center w-full">
          {/* <NavLink to="/" ml-auto>
            Home
          </NavLink> */}
          <NavLink to="/app/" className="ml-auto">
            app home
          </NavLink>
          <NavLink to="/signin" className="ml-auto">
            sign in
          </NavLink>
        </nav>
      </header>
      <main className="flex items-center justify-center pt-16 pb-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <footer className="flex flex-col gap-8 max-w-7xl mx-auto px-8 border-2 border-rose-300 mt-auto w-full md:flex-row md:gap-0 md:justify-between">
        <div className="flex justify-between md:gap-8">
          <NavLink to="">About us</NavLink>
          <NavLink to="">Help</NavLink>
        </div>
        <div className="text-center md:flex md:gap-8">
          <div className="flex justify-around md:gap-8">
            <NavLink to="">Privacy Policy</NavLink>
            <NavLink to="">Terms of Conditions</NavLink>
          </div>
          <p className="mt-2 md:mt-0">2026 tea corner. All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}
