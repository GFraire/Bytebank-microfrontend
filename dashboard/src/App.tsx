import React, { useEffect, useState } from "react";
import { getDashboardData, getTransactions } from "./api";
import { DashboardData, Transaction } from "./types/types";
import DashboardHeader from "./components/DashboardHeader";
import BalanceCard from "./components/BalanceCard";
import TransactionChart from "./components/TransactionChart";
import CategoryPieChart from "./components/CategoryPieChart";

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
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-primary flex flex-col rounded-lg p-4 gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-white">
          Análise de Transações
        </h2>

        <TransactionChart transactions={allTransactions} />
      </div>

      <div className="flex flex-col w-full gap-2">
        <h2 className="text-lg font-semibold text-white">
          Análise por Categoria
        </h2>

        <div className="flex gap-4">
          <div className="grow">
            <CategoryPieChart transactions={allTransactions} type="income" />
          </div>

          <div className="grow">
            <CategoryPieChart transactions={allTransactions} type="expense" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppDashboard;
