import React from "react";
import { X } from "phosphor-react";
import { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ onClose, title = " ", children }: ModalProps) {
  return (
    <div
      className="modal flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg p-4 max-w-md w-full "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start pb-6">
          {title && <h2 className="title ">{title}</h2>}
          <button
            onClick={onClose}
            className="p-1 hover:bg-cinza rounded-full transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
