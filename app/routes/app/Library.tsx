import type { Route } from "./+types/Library";
import { CONFIG } from "../../config";
import { TeaCard } from "~/components/TeaCard";
import type { UserTea } from "~/types/user-tea";
import { PlusIcon } from "lucide-react";
import { Button } from "~/components/Button";
import { useState } from "react";
import { Modal } from "~/components/Modal";
import { TeaForm } from "~/components/TeaForm";
import { useRevalidator } from "react-router";
import { DropDownButton } from "~/components/DropDownButton";

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
  const revalidator = useRevalidator();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUserTea, setSelectedUserTea] = useState<UserTea | null>(null);

  // Function to refresh the list
  const refresh = () => revalidator.revalidate();

  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }
  return (
    <section className="w-full">
      <header className="flex justify-between items-center mb-4">
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

          return (
            <div
              key={userTea.id}
              style={
                { "--anchor-element": `--${userTea.id}` } as React.CSSProperties
              }
              className="[anchor-name:var(--anchor-element)] flex-1 md:max-w-64"
            >
              <TeaCard tea={userTea.tea} />
              <DropDownButton
                useAnchor={true}
                className="p-1"
                items={[
                  {
                    label: "Edit",
                    onClick: () => {
                      setSelectedUserTea(userTea);
                      setEditOpen(true);
                    },
                  },
                  // {
                  //   label: "Delete",
                  //   onClick: () =>
                  //     submit(
                  //       { intent: "delete", id: ingredient.id },
                  //       { method: "delete" },
                  //     ),
                  // },
                ]}
              />
              {/* <TeaForm method="patch" tea={userTea.tea} onRefresh={refresh} /> */}
            </div>
          );
        })}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="New tea">
        <TeaForm
          key={open ? "new-tea-form" : "closed"}
          onClose={() => setOpen(false)}
          method="post"
          onRefresh={refresh}
        />
      </Modal>
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit tea"
      >
        <TeaForm
          key={selectedUserTea?.id ?? "new"}
          onClose={() => setEditOpen(false)}
          method="patch"
          onRefresh={refresh}
          tea={selectedUserTea?.tea}
        />
      </Modal>
    </section>
  );
}
