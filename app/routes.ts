import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/SiteLayout.tsx", [index("routes/Home.tsx")]),
  route("signup", "routes/auth/Signup.tsx"),
  route("signin", "routes/auth/Signin.tsx"),
] satisfies RouteConfig;
