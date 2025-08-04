import React, { useEffect, useState } from "react";
import { getDashboardData, getTransactions } from "./api";
import { DashboardData, Transaction } from "./types/types";
import CategoryPieChart from "./components/CategoryPieChart";
import RecentTransactions from "./components/RecentTransactions";
import TransactionChart from "./components/TransactionChart";

const BalanceCard: React.FC<{
  title: string;
  value: number;
  type: "default" | "income" | "expense";
}> = ({ title, value, type }) => {
  const formatCurrency = (value: number) => {
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Math.abs(value));
    return value < 0 ? `-${formatted}` : formatted;
  };

  const getTextColor = () => {
    switch (type) {
      case "income":
        return "text-green-600";
      case "expense":
        return "text-red-600";
      default:
        return value >= 0 ? "text-blue-600" : "text-red-600";
    }
  };

  return (
    <div className="flex items-baseline">
      <p
        className={`text-lg md:text-xl font-bold ${getTextColor()} whitespace-nowrap ${
          Math.abs(value) > 999999 ? "text-base" : ""
        }`}
      >
        {formatCurrency(value)}
      </p>
    </div>
  );
};

function AppDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    balance: 0,
    income: 0,
    expense: 0,
    transactions: [],
  });
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dashData = await getDashboardData();
        const transactions = await getTransactions();

        setDashboardData(dashData);
        setAllTransactions(transactions);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 p-4 md:p-6">
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            <p className="text-gray-600">Carregando dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Cards de Resumo */}
        <div className="mx-auto px-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg border-l-4 border-blue-500 p-4 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                    Saldo Total
                  </p>
                  <BalanceCard
                    title=""
                    value={dashboardData.balance}
                    type="default"
                  />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg border-l-4 border-green-500 p-4 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
                    Receitas
                  </p>
                  <BalanceCard
                    title=""
                    value={dashboardData.income}
                    type="income"
                  />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 11l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-gradient-to-br from-red-100 to-red-200 rounded-xl shadow-lg border-l-4 border-red-500 p-4 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">
                    Despesas
                  </p>
                  <BalanceCard
                    title=""
                    value={dashboardData.expense}
                    type="expense"
                  />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 13l-5 5m0 0l-5-5m5 5V6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 min-h-0 overflow-hidden">
              <div className="flex items-center space-x-3 mb-1">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Análise de Transações
                </h2>
              </div>
              <div className="h-80">
                <TransactionChart transactions={allTransactions} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 min-h-0 overflow-hidden">
              <div className="flex items-center space-x-3 mb-1">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                </div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Por Categoria
                </h2>
              </div>
              <div className="h-80">
                <CategoryPieChart
                  transactions={allTransactions}
                  type="expense"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Últimas Transações */}
        <div className="mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 overflow-x-auto">
            <div className="flex items-center space-x-3 mb-1">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-gray-900">
                Últimas Transações
              </h2>
            </div>
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppDashboard;
