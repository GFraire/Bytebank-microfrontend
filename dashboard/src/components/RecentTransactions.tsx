import React, { useEffect, useState } from "react";
import { Transaction } from "../types/types";
import { AuthUser } from "../App";

export default function RecentTransactions({
  user,
}: {
  user: AuthUser | null;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const mapCategoryToPortuguese = (category: string) => {
    const categoryMap: Record<string, string> = {
      bills: "Contas e Faturas",
      services: "Serviços",
      taxes: "Impostos",
      education: "Educação",
      entertainment: "Entretenimento",
      groceries: "Supermercado",
      transportation: "Transporte",
      health: "Saúde",
      clothing: "Vestuário",
      gifts: "Presentes",
      travel: "Viagens",
      other: "Outros",
    };
    return categoryMap[category] || category;
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/transactions?userId=${user?.uid}`
        );
        if (response.ok) {
          const data = await response.json();
          // Ordenar por data (mais recentes primeiro) e pegar apenas as 5 primeiras
          const sortedTransactions = data
            .sort(
              (a: any, b: any) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 5)
            .map((t: any) => ({
              id: t.id,
              description: t.description,
              amount: t.amount,
              type: t.type,
              date: t.date,
              category: t.category,
            }));
          setTransactions(sortedTransactions);
        }
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    fetchTransactions();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  function handleSeeAllTransactions() {
    const event = new CustomEvent("viewChanged", {
      detail: { view: "transactions" },
    });

    window.dispatchEvent(event);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Últimas Transações
        </h3>
        <button
          className="text-green-600 text-sm font-medium hover:text-green-700"
          onClick={handleSeeAllTransactions}
        >
          Ver todas
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                  style={{
                    backgroundColor:
                      transaction.type === "income" ? "#dcfce7" : "#fee2e2",
                    color:
                      transaction.type === "income" ? "#16a34a" : "#dc2626",
                  }}
                >
                  {transaction.type === "income" ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 13l-5 5m0 0l-5-5m5 5V6"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {mapCategoryToPortuguese(transaction.category)} •{" "}
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                  style={{
                    color:
                      transaction.type === "income" ? "#16a34a" : "#dc2626",
                  }}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
