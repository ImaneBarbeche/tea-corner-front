import React, {
  useEffect,
  useRef,
} from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="rounded-3xl p-5 bg-secondary-beige shadow-card backdrop:backdrop-blur-2xl"
    >
      <div className="flex flex-row gap-24">
        <h2 className="text-xl font-sans">{title}</h2>
        <button type="button" className="" onClick={onClose}>
            <X size={24} strokeWidth={1.5} />
        </button>
        </div>
      <div className="mt-5">{children}</div>
    </dialog>
  );
}
