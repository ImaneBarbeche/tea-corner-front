// import { type RouteConfig, index, route } from "@react-router/dev/routes";

// export default [
//   index("routes/home.tsx"),
//   //   route("signuo", "./signup.tsx"),
// ] satisfies RouteConfig;

import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes({
  ignoredRouteFiles: ["home.tsx"],
}) satisfies RouteConfig;
