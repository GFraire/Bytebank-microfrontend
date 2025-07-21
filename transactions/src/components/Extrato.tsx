import React from "react";
import ItemExtrato from "./ItemExtrato";

export function Extrato() {
  const gruposTransacoes = [
    {
      label: "Janeiro",
      transacoes: [
        { id: "1", tipoTransacao: "Depósito", valor: 100, data: new Date() },
        {
          id: "2",
          tipoTransacao: "Transferência",
          valor: 50,
          data: new Date(),
        },
      ],
    },
    {
      label: "Fevereiro",
      transacoes: [
        { id: "3", tipoTransacao: "Depósito", valor: 200, data: new Date() },
        {
          id: "4",
          tipoTransacao: "Transferência",
          valor: 30,
          data: new Date(),
        },
      ],
    },
  ];

  return (
    <aside className="card max-md:items-center relative">
      <h3 className="title pb-8">Extrato</h3>
      <div className="transacoes">
        {gruposTransacoes?.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-center">Nenhuma transação encontrada</h4>
          </div>
        )}
        {gruposTransacoes?.length > 0 &&
          gruposTransacoes.map((transacao) => (
            <div key={transacao.label}>
              <h4 className="mes-group">{transacao.label}</h4>
              {transacao.transacoes.map((tran) => (
                <ItemExtrato
                  id={tran.id}
                  key={tran.id}
                  tipo={tran.tipoTransacao}
                  valor={tran.valor}
                  data={tran.data.toString()}
                  onEditar={() => {}}
                />
              ))}
            </div>
          ))}
      </div>
    </aside>
  );
}
