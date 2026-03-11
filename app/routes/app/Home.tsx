import type { Route } from "./+types/Home";
import { CONFIG } from "../../config";
import { Button } from "~/components/Button";
import { NavLink } from "react-router";
import { useState } from "react";
import { Modal } from "~/components/Modal";

export async function clientLoader() {
  // const token = localStorage.getItem(CONFIG.TOKEN_KEY);

  try {
    const res = await fetch(`${CONFIG.API_URL}/tea/system`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   "Content-type": "application/json",
      // },
      // credentials: "include",
    });

    if (res.status === 401) {
      return { error: "Unauthorized" };
    }

    const data = await res.json();

    return {
      teas: data ? data : [],
      error: null,
    };
  } catch (err) {
    return { error: "Network error." };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }
  return (
      <>
      <button type="button" onClick={() => setIsOpen(true)}>Open</button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Test modal"
      >
        <p>Text</p>
        <p>Text2</p>
      </Modal>
    <ul>
      {loaderData.teas?.map((tea: any) => (
        <li key={tea.id}>
          <p>
            <strong>{tea.name}</strong> ({tea.type})
          </p>
          {/* <Button>view tea</Button> */}
          {/* <Button variant="secondary">view tea</Button> */}
          <NavLink to={`/app/tea/${tea.id}`}>view tea</NavLink>
        </li>
      ))}
    </ul>
    </>
  );
}
