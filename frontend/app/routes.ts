import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [

  route("home", "routes/home.tsx"),

  layout("routes/_layout.tsx", [
    route("intro", "routes/intro.tsx"),
    route("game", "routes/game.tsx"),
    // add more pages here: route("login", "routes/login.tsx"), etc
  ]),

  index("routes/index.tsx"),
] satisfies RouteConfig;
