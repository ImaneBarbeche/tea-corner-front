import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  NavLink,
} from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { CONFIG } from "../../config";
import waveImage from "~/assets/images/homepage-waves.webp";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

export async function clientAction({ request }: ActionFunctionArgs) {
  let formData = await request.formData();

  const data = Object.fromEntries(formData); // turn form values into an object

  if (data.password !== data.confirm_password) {
    return { error: "Passwords do not match." };
  }

  delete data.confirm_password;

  if (data.agree_terms === "on") {
    const now = new Date().toISOString();
    data.terms_accepted_at = now;
    data.privacy_accepted_at = now;
  }
  delete data.agree_terms;

  try {
    const response = await fetch(`${CONFIG.API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const resData = await response.json().catch(() => ({}));
    // Handle 400 or 500 errors from backend
    if (!response.ok) {
      // Handle both single errors and arrays of errors
      const errorMessage = Array.isArray(resData.message)
        ? resData.message.join(", ")
        : resData.message || "Something went wrong on the server.";

      return {
        error: errorMessage,
      };
    }
    const successMessage = resData.message;

    // redirecting to the signin page
    return redirect(`/signin?message=${encodeURIComponent(successMessage)}`);

    // return redirect("/signin");
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
        <Form method="post" className="flex flex-col gap-4">
          <h1 className="text-center text-4xl">Create an account</h1>
          <span className="text-center">sign up and start brewing</span>
          <label className="flex flex-col gap-1">
            <span>Display name</span>
            <Input
              name="display_name"
              type="text"
              required
              className="border"
              placeholder="Enter your display name"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>User name</span>
            <Input
              name="user_name"
              type="text"
              required
              className="border"
              placeholder="Enter your username"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>Email</span>
            <Input
              name="email"
              type="email"
              required
              className="border"
              placeholder="Enter your email"
            />
          </label>
          <div className="flex flex-row gap-3">
            <label className="flex flex-col gap-1">
              <span>Password</span>
              <Input
                name="password"
                type="password"
                required
                minLength={8}
                className="border"
                placeholder="Enter your password"
              />
            </label>
            <label htmlFor="" className="flex flex-col gap-1">
              <span>Confirm Password</span>
              <Input
                type="password"
                name="confirm_password"
                required
                className="border"
                placeholder="Confirm your password"
              />
            </label>
          </div>
          <label className="flex items-center gap-2 text-center md:text-left">
            <input type="checkbox" name="agree_terms" required />I agree to the{" "}
            <a href="/privacy" className="underline">Privacy Policy</a> and{" "}
            <a href="/terms" className="underline">Terms of Service</a>
          </label>
          {actionData?.error && <p>{actionData.error}</p>}
          <div className="flex flex-col items-center py-5">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="self-center"
            >
              {isSubmitting ? "signing up..." : "sign up"}
            </Button>
            <p className="mt-5">
              Already have an account?{" "}
              <NavLink to="/signin" className="underline">
                Log in
              </NavLink>
            </p>
          </div>
        </Form>
      </section>
    </section>
  );
}
