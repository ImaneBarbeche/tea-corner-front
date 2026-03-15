import { Input } from "./Input";
import { Button } from "./Button";
import type { Tea } from "~/types/tea";
import { useState } from "react";
import { TEA_TYPE_COLORS, TeaType } from "~/routes/app/enums/teaType.enum";
import { caffeineLevel } from "~/routes/app/enums/caffeineLevel.enum";
import { CONFIG } from "~/config";

interface TeaFormProps {
  onClose?: () => void;
  method: "post" | "patch";
  tea?: Tea | null;
}

export function TeaForm({ onClose, method, tea }: TeaFormProps) {
  const [selectedType, setSelectedType] = useState<TeaType>(
    tea?.type ?? TeaType.Green,
  );
  const [caffeine, setCaffeine] = useState<caffeineLevel>(
    tea?.caffeine_level ?? caffeineLevel.Medium,
  );
  const [isPublic, setIsPublic] = useState(tea?.is_public ?? false);

  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const formData = new FormData(e.currentTarget);

    // Payload
    const bodyData = {
      ...Object.fromEntries(formData),
      brewing_time: Number(formData.get("brewing_time")),
      brewing_temperature: Number(formData.get("brewing_temperature")),
      leaf_amount: Number(formData.get("leaf_amount")),
      water_amount: Number(formData.get("water_amount")),
      is_public: formData.get("is_public") === "on",
    };

    // Type of request
    const isEdit = method === "patch" && tea?.id;
    const url = isEdit
      ? `${CONFIG.API_URL}/tea/${tea.id}`
      : `${CONFIG.API_URL}/tea/create`;
    const httpMethod = isEdit ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method: httpMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
        credentials: "include",
      });

      const resData = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMsg = Array.isArray(resData.message)
          ? resData.message.join(", ")
          : resData.message || "An unexpected error occurred.";

        setServerError(errorMsg);
        return;
      }

      // If we just created a new tea, we need to add it to the user's library
      if (method === "post") {
        const newTeaId = resData.id;

        await fetch(`${CONFIG.API_URL}/user-tea/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tea_id: newTeaId,
            // notes: "Added from creation form",
            // inventory etc
          }),
          credentials: "include",
        });
      }

      console.log("Tea created and added to library!");

      onClose?.();
    } catch (err) {
      setServerError("Network error. Please check your connection.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <label className="flex flex-col gap-2.5">
        <span>Name</span>
        <Input
          name="name"
          className=""
          placeholder="Name"
          defaultValue={tea?.name}
        />
      </label>
      <label className="flex flex-col gap-2.5">
        <span>Description</span>
        <textarea
          name="description"
          className="min-h-40 px-4 py-2.5 bg-transparent text-primary-dark border-2 border-primary-dark rounded-2xl resize-none  focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
          placeholder="Name"
          defaultValue={tea?.description ?? ""}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="">Tea Category</span>
        <div
          className=""
          style={{ borderColor: TEA_TYPE_COLORS[selectedType] }}
        >
          <div
            className=""
            style={{ backgroundColor: TEA_TYPE_COLORS[selectedType] }}
          />
          <select
            name="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as TeaType)}
            className=""
          >
            {Object.values(TeaType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </label>
      <div className="flex flex-col gap-2">
        <span className="">Caffeine Level</span>
        <div className="flex">
          {Object.values(caffeineLevel).map((level) => {
            const isSelected = caffeine === level;
            return (
              <label key={level}>
                <input
                  type="radio"
                  name="caffeine_level"
                  value={level}
                  checked={isSelected}
                  onChange={(e) => setCaffeine(e.target.value as caffeineLevel)}
                  className="sr-only" // Hidden but accessible
                />
                {level}
              </label>
            );
          })}
        </div>
      </div>
      <label>
        <span>Source (Origin)</span>
        <Input name="source" defaultValue={tea?.source ?? ""} />
      </label>

      {/* Brewing Stats */}
      <div>
        <label>
          <span>Brewing Time (seconds)</span>
          <input
            type="number"
            name="brewing_time"
            defaultValue={tea?.brewing_time ?? 120}
          />
        </label>

        <label>
          <span>Temperature (°C)</span>
          <input
            type="number"
            name="brewing_temperature"
            defaultValue={tea?.brewing_temperature ?? 80}
          />
        </label>

        <label>
          <span>Leaf Amount (g)</span>
          <input
            type="number"
            name="leaf_amount"
            defaultValue={tea?.leaf_amount ?? 5}
          />
        </label>

        <label>
          <span>Water Amount (ml)</span>
          <input
            type="number"
            name="water_amount"
            defaultValue={tea?.water_amount ?? 250}
          />
        </label>
      </div>

      <label>
        <span>Instructions</span>
        <textarea
          name="instructions"
          defaultValue={tea?.instructions ?? ""}
          placeholder="Step by step guide..."
        />
      </label>
      <label>
        <input
          type="checkbox"
          name="is_public"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <span>Make this tea public</span>
      </label>

      <div className="flex flex-col-reverse gap-4 w-full md:flex-row md:ml-auto md:w-fit">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
      {serverError}
    </form>
  );
}
