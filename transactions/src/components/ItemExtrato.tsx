import React from "react";
import { useState } from "react";
import {
  DotsThreeVertical,
  Info,
  PencilSimple,
  TrashSimple,
  Warning,
} from "phosphor-react";
import { formatadorData, formatadorValor } from "../utils/formatador";
import Modal from "./ui/Modal";
import Button from "./ui/form/Button";

interface ItemExtratoProps {
  typeItemExtrato?: "LastTransaction" | "Transaction";
  id: number;
  type: string;
  amount: number;
  date: Date;
  recipient?: string;
  category?: string;
  onEditar?: (id: number) => void;
}

export default function ItemExtrato({
  typeItemExtrato = "Transaction",
  id,
  type,
  amount,
  date,
  recipient,
  category,
  onEditar,
}: ItemExtratoProps) {
  const [openModal, setOpenModal] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState(false);

  // Fecha o menu de ações quando clicado fora
  const handleClickOutside = () => {
    setActiveActionMenu(false);
  };

  function handleModalClose() {
    setOpenModal(false);
  }
  const handleExcluir = (id: number) => {
    console.log("Excluindo transação com ID:", id);
    // try {
    //   // removerTransacao(id);
    //   toast.success("Transação excluída com sucesso!");
    // } catch {
    //   toast.error("Erro ao excluir a transação.");
    // }
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
          <p className="text-base font-medium text-gray-800 mb-1">{type}</p>
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
              amount < 0 ? "text-secondary" : "text-green"
            }`}
          >
            {amount < 0 ? "" : "+"}
            {formatadorValor.format(amount)}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-gray-500 text-sm mb-2">
            {formatadorData.format(new Date(date))}
          </p>
          {/* Botão de ações */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveActionMenu(true);
              }}
              aria-label="Opções"
              className="p-1 hover:bg-gray-100 rounded"
            >
              <DotsThreeVertical size={22} />
            </button>
            {/* Menu de ações */}
            {activeActionMenu && (
              <div
                className="card absolute right-2 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (onEditar) onEditar(id);
                    setActiveActionMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-800  flex items-center"
                  // disabled={!onEditTransaction}
                >
                  <PencilSimple size={16} className="mr-2" />
                  Editar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setOpenModal(true);
                    setActiveActionMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-secondary hover:bg-red-100 hover:text-red-600 flex items-center"
                  // disabled={!onDeleteTransaction}
                >
                  <TrashSimple size={16} className="mr-2" />
                  Excluir
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Overlay para fechar o menu quando clicado fora */}
      {activeActionMenu && (
        <div className="fixed inset-0 z-0" onClick={handleClickOutside} />
      )}

      {openModal && (
        <Modal onClose={handleModalClose}>
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <Warning size={24} className="text-red-600" />
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-1">
              Confirmar exclusão
            </h3>
            <p className="text-sm text-gray-500">
              Tem certeza que deseja excluir esta transação?
              <br />
              Esta ação não pode ser desfeita.
            </p>
          </div>
          <div className="flex justify-between gap-2 mt-4 pt-6">
            <Button variant="outline" onClick={handleModalClose}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleExcluir(id);
                handleModalClose();
              }}
            >
              Excluir
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
