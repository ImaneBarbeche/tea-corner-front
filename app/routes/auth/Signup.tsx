import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  NavLink,
} from "react-router";
import type { ActionFunctionArgs } from "react-router";

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); // Converts form fields to your JSON object

  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Handle 400 or 500 errors from backend
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData.message || "Something went wrong on the server.",
      };
    }

    return redirect("/signin");
  } catch (err) {
    // Handle network failures (server is down)
    return { error: "Network error." };
  }
}

export default function Signup() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <Form method="post" className="flex flex-col">
        <label>
          <span>Display name</span>
          <input name="display_name" type="text" required className="border" />
        </label>
        <label>
          <span>User name</span>
          <input name="user_name" type="text" required className="border" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" required className="border" />
        </label>
        <label>
          <span>Password</span>
          <input name="password" type="password" required className="border" />
        </label>
        <label htmlFor="" className="flex flex-row">
          <span>Confirm Password</span>
          <input type="password" required className="border" />
        </label>

        {actionData?.error && <p>{actionData.error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "signing up..." : "sign up"}
        </button>
      </Form>
      <p>
        Already have an account? <NavLink to="/signin">Log in</NavLink>
      </p>
    </div>
  );
}
