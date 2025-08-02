import React from 'react';
import { Transaction } from '../types/types';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <article className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 h-full overflow-auto">
      <header className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Transações Recentes</h3>
        <p className="text-sm text-gray-500 mt-1">Últimas {transactions.length} transações</p>
      </header>
      
      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4 opacity-50">💳</div>
          <p className="text-gray-500">Nenhuma transação recente</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(transaction.date)}
                  </td>
                  <td className={`px-4 py-4 text-sm text-right font-semibold ${
                    transaction.type === 'income' ? 'text-green' : 'text-secondary'
                  }`}>
                    <span className="inline-flex items-center">
                      {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
};

export default RecentTransactions;