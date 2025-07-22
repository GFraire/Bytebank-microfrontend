import React, { useState } from "react";
import { DotsThreeVertical, Hamburger, Pencil, Trash } from "phosphor-react";
import Button from "./ui/form/Button";
import { formatadorValor } from "../utils/formatadorValor";
import { Hmac } from "crypto";

interface ItemExtratoProps {
  id: number;
  tipo: string;
  valor: number;
  data: string;
  recipient?: string;
  category?: string;
  onEditar?: (id: number) => void;
}

export default function ItemExtrato({
  id,
  tipo,
  valor,
  data,
  recipient,
  category,
  onEditar,
}: ItemExtratoProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="transacao-item border-b-2 border-gray-200 pb-4 mb-4 w-full">
      <div className="flex justify-between items-start w-full">
        <div className="flex-1 pr-4">
          <p className="text-base font-medium text-gray-800 mb-1">{tipo}</p>
          {recipient && (
            <p className="text-xs text-gray-600 mb-1">Para: {recipient}</p>
          )}
          {category && (
            <p className="text-xs text-gray-600 mb-1">Categoria: {category}</p>
          )}
          <p
            className={`text-base font-bold ${
              valor < 0 ? "text-secondary" : "text-green"
            }`}
          >
            {valor < 0 ? "" : "+"}
            {formatadorValor.format(valor)}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-gray-500 text-sm mb-2">
            {new Date(data).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
          {/* Botão de ações */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // toggleActionMenu(transaction.id);
            }}
            aria-label="Opções"
            className="p-1 hover:bg-gray-100 rounded"
          >
            <DotsThreeVertical size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
