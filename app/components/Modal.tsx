import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export function Modal({
  open,
  onClose,
  title,
  children,
  ...props
}: ModalProps) {
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
      className="fixed inset-0 m-auto rounded-3xl p-5 bg-secondary-beige shadow-card backdrop:backdrop-blur-2xlNOT backdrop-blur-2xl backdrop:bg-transparent"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-sans">{title}</h3>
        <Button icon={X} variant="ghost" size="large" onClick={onClose} />
      </div>
      <div className="mt-5">{children}</div>
    </dialog>
  );
}
