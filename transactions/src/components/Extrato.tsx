import React, { useState, useEffect } from "react";
import ItemExtrato from "./ItemExtrato";
import {
  groupTransactionsByMonth,
  getLastTransaction,
} from "../utils/transactionHelpers";
import Modal from "./ui/Modal";
import TransacaoForm from "./TransactionFormEdit";
import { transactionService, Transaction as ApiTransaction } from "../services/transactionService";

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: Date;
  month: string;
  description?: string;
  recipient?: string;
  category?: string;
  attachments?: string[];
}

export function Extrato() {
  const [gruposTransacoes, setGruposTransacoes] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const apiTransactions = await transactionService.getAll();
      
      // Converter para o formato esperado pelo componente
      const transactions: Transaction[] = apiTransactions.map(t => ({
        id: t.id!,
        type: t.type === 'income' ? 'deposit' : 'withdrawal',
        amount: t.type === 'expense' ? -t.amount : t.amount,
        date: new Date(t.date),
        month: new Date(t.date).toLocaleDateString('pt-BR', { month: 'long' }),
        description: t.description,
        category: t.category,
        attachments: t.attachments,
      }));
      
      setGruposTransacoes(transactions);
    } catch (err) {
      setError('Erro ao carregar transações');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    loadTransactions(); // Recarrega as transações
    fecharModal();
  };

  const handleRemover = async (id: number) => {
    try {
      await transactionService.delete(id);
      loadTransactions(); // Recarrega as transações
    } catch (err) {
      console.error('Erro ao remover transação:', err);
    }
  };

  const handleDelete = (id: number) => {
    loadTransactions(); // Recarrega as transações
    fecharModal();
  };

  if (loading) {
    return (
      <aside className="card max-md:items-center relative">
        <h3 className="title pb-8">Extrato</h3>
        <div className="flex justify-center items-center h-32">
          <p>Carregando transações...</p>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="card max-md:items-center relative">
        <h3 className="title pb-8">Extrato</h3>
        <div className="flex justify-center items-center h-32">
          <p className="text-red-500">{error}</p>
        </div>
      </aside>
    );
  }

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
                  onRemover={handleRemover}
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
                  onRemover={handleRemover}
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
            onDelete={handleDelete}
          />
        </Modal>
      )}
    </aside>
  );
}
