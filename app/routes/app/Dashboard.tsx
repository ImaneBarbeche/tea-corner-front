import { CONFIG } from "~/config";
import type { Route } from "./+types/Dashboard";
import type { User } from "~/types/user";

export async function clientLoader() {
  try {
    const profileRes = await fetch(`${CONFIG.API_URL}/user/profile`, {
      credentials: "include",
    });

    if (!profileRes.ok) {
      return { error: "Unauthorized", profile: null, users: null };
    }

    const profile: User = await profileRes.json();

    if (profile.role !== "admin") {
      return { profile, users: null, error: null };
    }

    const usersRes = await fetch(`${CONFIG.API_URL}/user/user-management/all`, {
      credentials: "include",
    });
    const users = await usersRes.json();

    return { profile, users: users ?? [], error: null };
  } catch (err) {
    return { error: "Network error.", profile: null, users: null };
  }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  if (loaderData.error) {
    return <p>Une erreur est survenue.</p>;
  }

  return (
    <section>
      <h2>Bienvenu{loaderData.profile ? `, ${loaderData.profile.display_name}` : ""}</h2>
      {loaderData.users && (
        <table>
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {loaderData.users.map((user: User) => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user.display_name}</td>
                <td className="px-4 py-2">@{user.user_name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.status}</td>
                <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
