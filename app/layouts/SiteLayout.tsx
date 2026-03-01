import { Outlet, NavLink } from "react-router";

export default function SiteLayout() {
  return (
    <>
      <header className="flex px-8 justify-between max-w-7xl mx-auto">
        {/* logo */}
        <div>logo</div>
        <nav className="flex gap-4 justify-center w-full">
          {/* <NavLink to="/" ml-auto>
            Home
          </NavLink> */}
          <NavLink to="/signup" className="ml-auto">
            sign up
          </NavLink>
        </nav>
      </header>
      <main className="flex items-center justify-center pt-16 pb-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <footer>footer text</footer>
    </>
  );
}
