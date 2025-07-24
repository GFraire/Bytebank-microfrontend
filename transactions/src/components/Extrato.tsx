import React, { useState } from "react";
import ItemExtrato from "./ItemExtrato";
import {
  groupTransactionsByMonth,
  getLastTransaction,
} from "../utils/transactionHelpers";
import Modal from "./ui/Modal";
import TransacaoForm from "./TransactionFormEdit";

export interface Transaction {
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
      type: "deposit",
      amount: 10000,
      month: "Janeiro",
      date: new Date(),
    },
    {
      id: 2,
      type: "withdrawal",
      amount: -50,
      month: "Janeiro",
      category: "groceries",
      recipient: "Maria",
      date: new Date(),
    },
    {
      id: 3,
      type: "payment",
      amount: -200,
      month: "Fevereiro",
      category: "services",
      date: new Date(),
    },
    {
      id: 4,
      type: "deposit",
      amount: 745,
      month: "Fevereiro",
      date: new Date(),
    },
    {
      id: 5,
      type: "transfer",
      amount: -30,
      month: "Fevereiro",
      category: "entertainment",
      recipient: "Ana",
      date: new Date(),
    },
  ];

  // Usando as funções utilitárias
  const lastTransaction = getLastTransaction(gruposTransacoes);
  const transacoesPorMes = groupTransactionsByMonth(gruposTransacoes);
  const [transacaoParaEditar, setTransacaoParaEditar] =
    useState<Transaction | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = (transacao: Transaction) => {
    setTransacaoParaEditar(transacao);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setTransacaoParaEditar(null);
    setModalAberto(false);
  };

  const handleSave = () => {
    fecharModal();
  };

  return (
    <aside className="card max-md:items-center relative">
      <h3 className="title pb-8">Extrato</h3>
      <div className="transacoes max-md:items-center">
        {/* Última operação realizada */}
        {lastTransaction && (
          <div className="mb-4 w-full max-w-96 max-sm:max-w-full">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold text-gray-800 ">
                Última operação
              </h3>
              <div className="flex justify-between items-start">
                <ItemExtrato
                  typeItemExtrato="LastTransaction"
                  id={lastTransaction.id}
                  key={lastTransaction.id}
                  type={lastTransaction.type}
                  amount={lastTransaction.amount}
                  date={lastTransaction.date}
                  recipient={lastTransaction.recipient}
                  category={lastTransaction.category}
                  onEditar={() => abrirModal(lastTransaction)}
                />
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
              {transacoes.map((transacao, key) => (
                <ItemExtrato
                  typeItemExtrato="Transaction"
                  id={transacao.id}
                  key={transacao.id}
                  type={transacao.type}
                  amount={transacao.amount}
                  date={transacao.date}
                  recipient={transacao.recipient}
                  category={transacao.category}
                  onEditar={() => abrirModal(transacao)}
                />
              ))}
            </div>
          ))}
      </div>
      {modalAberto && (
        <Modal onClose={fecharModal} title="Editar Transação">
          <TransacaoForm
            fecharModal={fecharModal}
            modo="editar"
            transacaoParaEditar={transacaoParaEditar}
            onSave={handleSave}
          />
        </Modal>
      )}
    </aside>
  );
}
