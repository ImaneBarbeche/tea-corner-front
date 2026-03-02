import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  NavLink,
} from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { getCsrfToken } from "~/lib/csrf";
import { CONFIG } from "../../config";

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch(`${CONFIG.API_URL}/auth/signin`, {
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

    const { access_token } = await response.json();

    if (access_token) {
      localStorage.setItem(CONFIG.TOKEN_KEY, access_token);
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
