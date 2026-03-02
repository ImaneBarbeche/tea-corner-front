import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <nav>
        <ul>
          <li>test</li>
        </ul>
      </nav>
      <main className="flex items-center justify-center pt-16 pb-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}
