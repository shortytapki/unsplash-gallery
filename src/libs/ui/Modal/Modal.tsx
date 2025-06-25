import { CloseIcon } from "@/assets/icons";
import type { ReactNode } from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export const Modal = ({ opened, onClose, children }: ModalProps) => {
  if (!opened) return <></>;
  return (
    <div
      className="bg-backdrop fixed inset-0 z-40 flex items-baseline justify-center sm:items-center"
      onClick={onClose}
    >
      <div
        className="fixed top-[16px] right-[16px] z-50 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white hover:cursor-pointer"
        onClick={onClose}
      >
        <CloseIcon />
      </div>
      <div className="flex h-full w-full justify-center py-0 md:py-[40px]">
        {children}
      </div>
    </div>
  );
};
