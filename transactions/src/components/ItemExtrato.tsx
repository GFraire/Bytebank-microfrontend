import React, { useState } from "react";
import { Pencil, Trash } from "phosphor-react";
import { Separador } from "./ui/form/Separador";
import Button from "./ui/form/Button";
import { formatadorValor } from "../utils/formatadorValor";

interface ItemExtratoProps {
  id: string;
  tipo: string;
  valor: number;
  data: string;
  onEditar?: (id: string) => void;
}

export default function ItemExtrato({
  id,
  tipo,
  valor,
  data,
  onEditar,
}: ItemExtratoProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div
        key={id}
        className={`transacao-item ${
          tipo === "Depósito" ? "text-green" : "text-secondary"
        }`}
      >
        <div className="flex flex-row items-center gap-4 justify-between w-full">
          <p className="text-nowrap">{tipo}</p>
          <p className="text-gray-500 text-xs ">
            {new Date(data).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <h6 className="pr-4">{formatadorValor.format(valor)}</h6>
          <div className="flex flex-row gap-2">
            <Button
              variant="icon"
              onClick={() => {
                if (onEditar) onEditar(id);
              }}
            >
              <Pencil />
            </Button>
            <Button variant="icon" onClick={() => setOpenModal(true)}>
              <Trash />
            </Button>
          </div>
        </div>

        <Separador size="large" />
      </div>
    </div>
  );
}
