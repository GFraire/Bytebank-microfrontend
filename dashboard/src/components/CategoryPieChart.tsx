import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Transaction } from "../types/types";

interface CategoryPieChartProps {
  transactions: Transaction[];
  type: "income" | "expense";
}

const COLORS = [
  "#004D61",
  "#47A138",
  "#FF5031",
  "#8B8B8B",
  "#767676",
  "#CBCBCB",
  "#444444",
  "#E4EDE3",
];

const categoryTranslations: Record<string, string> = {
  bills: "Contas",
  groceries: "Compras",
  // Adicione mais traduções conforme necessário
  // Exemplo: transport: 'Transporte',
};

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  transactions,
  type,
}) => {
  const categoryData = useMemo(() => {
    const filteredTransactions = transactions.filter((t) => t.type === type);
    const categoryTotals: Record<string, number> = {};

    filteredTransactions.forEach((transaction) => {
      const categoryName =
        categoryTranslations[transaction.category] || transaction.category;
      if (!categoryTotals[categoryName]) {
        categoryTotals[categoryName] = 0;
      }
      categoryTotals[categoryName] += transaction.amount;
    });

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value: Math.abs(value),
    }));
  }, [transactions, type]);

  const formatLabel = (name: string, percent: number | undefined) => {
    const maxLength = 8;
    const truncatedName =
      name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
    const percentValue =
      percent !== undefined ? (percent * 100).toFixed(0) : "0";
    return `${truncatedName}: ${percentValue}%`;
  };

  const title =
    type === "income" ? "Receitas por Categoria" : "Despesas por Categoria";
  const isEmpty = categoryData.length === 0;

  return (
    <article className="bg-white p-2 rounded-lg shadow-sm border border-gray-300">
      <header className="mb-1">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      </header>

      {isEmpty ? (
        <div className="h-[240px] flex flex-col items-center justify-center text-gray-500">
          <div className="text-4xl mb-2 opacity-50">📈</div>
          <p>Sem dados para exibir</p>
        </div>
      ) : (
        <div
          className="chart-wrapper"
          style={{ maxHeight: "240px", overflow: "hidden" }}
        >
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => formatLabel(name, percent)}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `R$ ${new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(value)}`,
                  name,
                ]}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                wrapperStyle={{
                  paddingLeft: "10px",
                  maxWidth: "100px",
                  fontSize: "10px",
                  overflow: "hidden",
                }}
                formatter={(value) =>
                  value.length > 12 ? `${value.slice(0, 12)}...` : value
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
};

export default CategoryPieChart;
