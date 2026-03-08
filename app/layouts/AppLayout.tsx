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
          <li>nav</li>
        </ul>
      </nav>
      <main className="flex flex-col items-center justify-center w-full h-full pt-16NOT px-2 pb-4NOT max-w-7xl mx-auto md:px-6">
        <Outlet />
      </main>
    </>
  );
}
