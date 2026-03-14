import { Outlet, redirect } from "react-router";
import { AppNav } from "~/components/AppNav";
import { refreshAccessToken } from "~/lib/api";

export async function clientLoader() {
  const ok = await refreshAccessToken(); // tente un refresh au load
  if (!ok) throw redirect("/signin");
}

export default function AppLayout() {
  return (
    <>
      <AppNav />
      <main className="flex items-center justify-center py-16 pb-36 w-full max-w-7xl mx-4NOT mx-auto px-4 min-h-screenNOT md:pl-[calc(4.8rem+1rem)] md:pb-16">
        <Outlet />
      </main>
    </>
  );
}
