import type { Route } from "./+types/Library";
import { CONFIG } from "../../config";
import { TeaCard } from "~/components/TeaCard";
import type { UserTea } from "~/types/user-tea";
import { PlusIcon } from "lucide-react";
import { Button } from "~/components/Button";
import { useState } from "react";
import { Modal } from "~/components/Modal";
import { TeaForm } from "~/components/TeaForm";

export async function clientLoader() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/user-tea/library`, {
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 401) {
      return { error: "Unauthorized" };
    }

    const data = await res.json();
    console.log(data);

    return {
      userTeas: data ? (data as UserTea[]) : [],
      error: null,
    };
  } catch (err) {
    return { error: "Network error." };
  }
}

export default function Library({ loaderData }: Route.ComponentProps) {
  const [open, setOpen] = useState(false);

  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }
  return (
    <section className="w-full">
      <header className="flex justify-between items-center">
        <h2>Library</h2>
        <Button
          onClick={() => setOpen(true)}
          variant="secondary"
          icon={PlusIcon}
        >
          Add
        </Button>
      </header>
      <div className="flex gap-4 flex-wrap md:gap-8">
        {loaderData.userTeas?.map((userTea: UserTea) => {
          // If the relation is missing for some reason, don't crash
          if (!userTea.tea) return null;

          return <TeaCard tea={userTea.tea} key={userTea.id} />;
        })}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="New tea">
        <TeaForm onClose={() => setOpen(false)} method="post" />
      </Modal>
    </section>
  );
}
