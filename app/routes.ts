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

  route("app", "layouts/AppLayout.tsx", [
    index("routes/app/Home.tsx"),
    // route("settings", "routes/app/Settings.tsx"),
  ]),
] satisfies RouteConfig;
