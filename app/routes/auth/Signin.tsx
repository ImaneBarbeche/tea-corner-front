import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  NavLink,
} from "react-router";
import type { ActionFunctionArgs } from "react-router";
// import { getCsrfToken } from "~/lib/csrf";
import { CONFIG } from "../../config";
import { Button } from "~/components/Button";
import waveImage from "~/assets/images/homepage-waves.webp";

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch(`${CONFIG.API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

    // if (access_token) {
    //   localStorage.setItem(CONFIG.TOKEN_KEY, access_token);
    // }

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
    <section className="md:flex md:h-screen md:overflow-hidden">
      <picture className="w-full max-w-100 mx-auto md:basis-2/3 md:max-w-none md:h-full">
        <img
          className="w-full max-h-100 object-cover md:h-full md:max-h-none"
          title="Green waves"
          alt="A pattern of green waves"
          src={waveImage}
        ></img>
      </picture>
      <section className="flex flex-col bg-white gap-4 px-11 py-8 shadow-xl rounded-4xl md:flex-1 md:items-center md:justify-center md:py-2.5 md:px-2.5 md:shadow-none">
        <Form method="post" className="flex flex-col gap-4 mt-4">
          <h1 className="text-center text-4xl md:text-left">Welcome Back</h1>
          <span className="text-center">Brew mindfully</span>
          <label className="flex flex-col gap-1">
            <span>Username</span>
            <input
              name="user_name"
              type="text"
              required
              className="border"
              placeholder="Enter your username"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>Password</span>
            <input
              name="password"
              type="password"
              required
              className="border"
              placeholder="Enter your password"
            />
          </label>
          {/* add api call to forgot password route */}
          <NavLink to="" className="underline text-center md:text-left">
            Forgot your password?
          </NavLink>
          {actionData?.error && <p>{actionData.error}</p>}
        <div className="flex flex-col items-center py-5">
          <Button type="submit" disabled={isSubmitting} className="self-center">
            {isSubmitting ? "signing in..." : "sign in"}
          </Button>
        <p className="mt-8">
          Don't have an account?{" "}
          <NavLink to="/signup" className="underline">
            Sign up
          </NavLink>
        </p>
        </div>
        </Form>
      </section>
    </section>
  );
}
