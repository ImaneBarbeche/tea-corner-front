import { Outlet, redirect } from "react-router";
import { refreshAccessToken } from "~/lib/api";

export async function clientLoader() {
  const ok = await refreshAccessToken(); // tente un refresh au load
  if (!ok) throw redirect("/signin");
}

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
