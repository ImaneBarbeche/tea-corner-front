import { Input } from "./Input";
import { Button } from "./Button";
import type { Tea } from "~/types/tea";

interface TeaFormProps {
  onClose?: () => void;
  method: "post" | "patch";
  tea?: Tea | null;
}

export function TeaForm({ onClose, method, tea }: TeaFormProps) {
  return (
    <form>
      <label>
        <span>Name</span>
        <Input
          name="name"
          className=""
          placeholder="Name"
          defaultValue={tea?.name}
        />
      </label>
    </form>
  );
}
