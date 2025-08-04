import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "../types/types";

interface TransactionChartProps {
  transactions: Transaction[];
}

const TransactionChart: React.FC<TransactionChartProps> = ({
  transactions,
}) => {
  const processChartData = () => {
    const monthlyData: Record<string, { income: number; expense: number }> = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { income: 0, expense: 0 };
      }

      if (transaction.type === "income") {
        monthlyData[monthYear].income += transaction.amount;
      } else {
        monthlyData[monthYear].expense += transaction.amount;
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
    }));
  };

  const chartData = processChartData();

  return (
    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-300">
      <h3 className="text-sm font-medium mb-1">Receitas vs Despesas</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
          barGap={4}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip
            formatter={(value: number) => [
              `R$ ${new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(value)}`,
              undefined,
            ]}
            labelFormatter={(label) => `Mês: ${label}`}
          />
          <Legend wrapperStyle={{ fontSize: "10px" }} />
          <Bar dataKey="income" name="Receitas" fill="#47A138" barSize={30} />
          <Bar dataKey="expense" name="Despesas" fill="#FF5031" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
