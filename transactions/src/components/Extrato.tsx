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
  userId?: string;
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
        attachments: t.attachments || [],
        userId: (t as any).userId, // Preserva o userId da API
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
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Extrato de Transações</h3>
        </div>
        <div className="flex justify-center items-center h-32">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            <p className="text-gray-600">Carregando transações...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Extrato de Transações</h3>
        </div>
        <div className="flex justify-center items-center h-32">
          <div className="text-center">
            <span className="text-4xl mb-2 block">⚠️</span>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Extrato de Transações</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>🔄</span>
          <span>Atualizado agora</span>
        </div>
      </div>
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
    </div>
  );
}
