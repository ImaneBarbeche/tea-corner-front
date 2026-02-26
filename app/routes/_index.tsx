// import type { Route } from "./+types/home";
import type { Route } from "../+types/root";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tea Corner" },
    { name: "description", content: "An alternative tea app companion to help you brew mindfully" },
  ];
}

export default function Home() {
  return <Welcome />;
}
