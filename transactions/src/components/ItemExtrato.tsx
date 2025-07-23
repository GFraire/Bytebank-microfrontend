import React, { useState } from "react";
import {
  DotsThreeVertical,
  Hamburger,
  Pencil,
  PencilSimple,
  Trash,
  TrashSimple,
} from "phosphor-react";
import { formatadorValor } from "../utils/formatadorValor";

interface ItemExtratoProps {
  typeItemExtrato?: "LastTransaction" | "Transaction";
  id: number;
  tipo: string;
  valor: number;
  data: string;
  recipient?: string;
  category?: string;
  onEditar?: (id: number) => void;
}

export default function ItemExtrato({
  typeItemExtrato = "Transaction",
  id,
  tipo,
  valor,
  data,
  recipient,
  category,
  onEditar,
}: ItemExtratoProps) {
  const [openModal, setOpenModal] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);

  // Função para alternar a visibilidade do menu de ações
  const toggleActionMenu = (id: number) => {
    if (activeActionMenu === id) {
      setActiveActionMenu(null);
    } else {
      setActiveActionMenu(id);
    }
  };
  // Fecha o menu de ações quando clicado fora
  const handleClickOutside = () => {
    setActiveActionMenu(null);
  };
  return (
    <div
      className={`${
        typeItemExtrato === "Transaction"
          ? "transacao-item border-b-2 border-gray-200 pb-4 mb-4 w-full"
          : "transacao-item pb-2 w-full"
      }`}
    >
      <div className="flex justify-between items-start w-full">
        <div className="flex-1 pr-4">
          <p className="text-base font-medium text-gray-800 mb-1">{tipo}</p>
          {typeItemExtrato === "Transaction" && (
            <>
              {recipient && (
                <p className="text-xs text-gray-600 mb-1">Para: {recipient}</p>
              )}
              {category && (
                <p className="text-xs text-gray-600 mb-1">
                  Categoria: {category}
                </p>
              )}
            </>
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
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleActionMenu(id);
              }}
              aria-label="Opções"
              className="p-1 hover:bg-gray-100 rounded"
            >
              <DotsThreeVertical size={22} />
            </button>
            {/* Menu de ações */}
            {activeActionMenu === id && (
              <div
                className="card absolute right-2 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  // onClick={() => handleEdit(transaction)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  // disabled={!onEditTransaction}
                >
                  <PencilSimple size={16} className="mr-2" />
                  Editar
                </button>
                <button
                  // onClick={() => confirmDelete(transaction.id)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  // disabled={!onDeleteTransaction}
                >
                  <TrashSimple size={16} className="mr-2" />
                  Excluir
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Overlay para fechar o menu quando clicado fora */}
      {activeActionMenu !== null && (
        <div className="fixed inset-0 z-0" onClick={handleClickOutside} />
      )}
    </div>
  );
}
