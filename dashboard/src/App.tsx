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
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-8">
          <DashboardHeader userName="João" />
        </header>
        
        {/* Grid Principal */}
        <div className="grid grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Coluna 1 - Cards de Resumo */}
          <div className="space-y-4">
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Resumo Financeiro</h2>
              <div className="space-y-4">
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
            </section>
          </div>
          
          {/* Coluna 2 - Gráficos */}
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Análise de Transações</h2>
              <TransactionChart transactions={allTransactions} />
            </section>
            
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Análise por Categoria</h2>
              <div className="grid grid-cols-1 gap-4">
                <CategoryPieChart transactions={allTransactions} type="income" />
                <CategoryPieChart transactions={allTransactions} type="expense" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AppDashboard;
