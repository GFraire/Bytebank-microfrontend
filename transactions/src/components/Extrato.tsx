import React from "react";
import ItemExtrato from "./ItemExtrato";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: Date;
  month: string;
  recipient?: string;
  category?: string;
}

export function Extrato() {
  const gruposTransacoes: Transaction[] = [
    {
      id: 1,
      type: "Depósito",
      amount: 10000,
      month: "Janeiro",
      category: "Salário do mês de Janeiro de 2025",
      date: new Date(),
    },
    {
      id: 2,
      type: "Transferência",
      amount: -50,
      month: "Janeiro",
      recipient: "João",
      date: new Date(),
    },
    {
      id: 3,
      type: "Depósito",
      amount: 200,
      month: "Fevereiro",
      date: new Date(),
    },
    {
      id: 4,
      type: "Transferência",
      amount: -30,
      month: "Fevereiro",
      date: new Date(),
    },
  ];
  // Se não há transações, não temos última operação
  const lastTransaction =
    gruposTransacoes.length > 0 ? gruposTransacoes[0] : null;

  // Agrupar transações por mês
  const transacoesPorMes = gruposTransacoes.reduce((grupos, transacao) => {
    const mes = transacao.month;
    if (!grupos[mes]) {
      grupos[mes] = [];
    }
    grupos[mes].push(transacao);
    return grupos;
  }, {} as Record<string, Transaction[]>);
  return (
    <aside className="card max-md:items-center relative">
      <h3 className="title pb-8">Extrato</h3>
      <div className="transacoes max-md:items-center">
        {/* Última operação realizada */}
        {lastTransaction && (
          <div className="mb-4 pb-4 w-full max-w-96 max-sm:max-w-full">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Última operação
              </h3>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">
                    {lastTransaction.type}
                  </p>
                  <p
                    className={`text-xl font-bold ${
                      lastTransaction.amount < 0
                        ? "text-secondary"
                        : "text-green"
                    }`}
                  >
                    {lastTransaction.amount < 0 ? "-" : "+"}R${" "}
                    {Math.abs(lastTransaction.amount)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-gray-500">
                    {lastTransaction.date.toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Histórico completo
        </h3>
        {gruposTransacoes?.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-center">Nenhuma transação encontrada</h4>
          </div>
        )}
        {gruposTransacoes?.length > 0 &&
          Object.entries(transacoesPorMes).map(([mes, transacoes]) => (
            <div key={mes} className="w-full max-w-96 max-sm:max-w-full">
              <h4 className="mes-group">{mes}</h4>
              {transacoes.map((transacao) => (
                <ItemExtrato
                  id={transacao.id}
                  key={transacao.id}
                  tipo={transacao.type}
                  valor={transacao.amount}
                  data={transacao.date.toString()}
                  recipient={transacao.recipient}
                  category={transacao.category}
                  onEditar={() => {}}
                />
              ))}
            </div>
          ))}
      </div>
    </aside>
  );
}
