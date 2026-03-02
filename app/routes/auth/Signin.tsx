import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  NavLink,
} from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { getCsrfToken } from "~/lib/csrf";

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${apiUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": getCsrfToken() ?? "",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData.message || "Something went wrong on the server.",
      };
    }

    return redirect("/app/");
  } catch (err) {
    return { error: "Network error." };
  }
}

export default function Signin() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <Form method="post" className="flex flex-col">
        <label>
          <span>Username</span>
          <input name="user_name" type="text" required className="border" />
        </label>
        <label>
          <span>Password</span>
          <input name="password" type="password" required className="border" />
        </label>

        {actionData?.error && <p>{actionData.error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "signing in..." : "sign in"}
        </button>
      </Form>
      <p>
        Don't have an account? <NavLink to="/signup">Sign up</NavLink>
      </p>
    </div>
  );
}
