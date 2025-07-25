import React, { useEffect, useState } from "react";
import { getDashboardData, getTransactions } from "./api";
import { DashboardData, Transaction } from "./types";
import DashboardHeader from "./components/DashboardHeader";
import BalanceCard from "./components/BalanceCard";
import TransactionChart from "./components/TransactionChart";
import CategoryPieChart from "./components/CategoryPieChart";
import RecentTransactions from "./components/RecentTransactions";

function AppDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    balance: 0,
    income: 0,
    expense: 0,
    transactions: []
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
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 bg-background min-h-screen">
      <DashboardHeader userName="João" />
      
      {/* Cards de Saldo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <BalanceCard 
          title="Saldo Atual" 
          value={dashboardData.balance} 
          type="default" 
        />
        <BalanceCard 
          title="Receitas" 
          value={dashboardData.income} 
          type="income" 
        />
        <BalanceCard 
          title="Despesas" 
          value={dashboardData.expense} 
          type="expense" 
        />
      </div>
      
      {/* Gráfico de Barras */}
      <div className="mb-6">
        <TransactionChart transactions={allTransactions} />
      </div>
      
      {/* Gráficos de Pizza */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <CategoryPieChart transactions={allTransactions} type="income" />
        <CategoryPieChart transactions={allTransactions} type="expense" />
      </div>
      
      {/* Transações Recentes */}
      <div className="mb-6">
        <RecentTransactions transactions={dashboardData.transactions} />
      </div>
    </div>
  );
}

export default AppDashboard;
