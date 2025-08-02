import React, { useState, useEffect } from "react";
import Modal from "./components/ui/Modal";
import TransacaoForm from "./components/TransactionFormEdit";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  recipient?: string;
}

function AppTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:3333/transactions');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.amount.toString().includes(searchTerm);
    const matchesCategory = categoryFilter === 'all' || transaction.type === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTransaction(null);
    setModalOpen(false);
  };

  const handleSave = () => {
    fetchTransactions();
    handleCloseModal();
  };

  const handleDelete = () => {
    fetchTransactions();
    handleCloseModal();
  };

  if (loading) {
    return (
      <div className="bg-gray-50 p-4 md:p-6">
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Carregando transações...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
              <select 
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos os períodos</option>
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 90 dias</option>
                <option value="365">Este ano</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos os tipos</option>
                <option value="income">Receitas</option>
                <option value="expense">Despesas</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
              <input 
                type="text" 
                placeholder="Buscar transação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Lista de Transações */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Transações ({filteredTransactions.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">📋</div>
                <p className="text-gray-500">Nenhuma transação encontrada</p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`} style={{
                        backgroundColor: transaction.type === 'income' ? '#dcfce7' : '#fee2e2',
                        color: transaction.type === 'income' ? '#16a34a' : '#dc2626'
                      }}>
                        {transaction.type === 'income' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.category} • {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`} style={{
                          color: transaction.type === 'income' ? '#16a34a' : '#dc2626'
                        }}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        {transaction.recipient && (
                          <p className="text-sm text-gray-500">{transaction.recipient}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Editar transação"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {modalOpen && editingTransaction && (
        <Modal onClose={handleCloseModal} title="Editar Transação">
          <TransacaoForm
            fecharModal={handleCloseModal}
            modo="editar"
            transacaoParaEditar={{
              id: editingTransaction.id,
              type: editingTransaction.type === 'income' ? 'deposit' : 'withdrawal',
              amount: editingTransaction.amount,
              date: new Date(editingTransaction.date),
              month: new Date(editingTransaction.date).toLocaleDateString('pt-BR', { month: 'long' }),
              description: editingTransaction.description,
              category: editingTransaction.category,
              recipient: editingTransaction.recipient
            }}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </Modal>
      )}
    </div>
  );
}

export default AppTransaction;
