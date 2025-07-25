import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Transaction, CategoryTotal } from '../types';

interface CategoryPieChartProps {
  transactions: Transaction[];
  type: 'income' | 'expense';
}

const COLORS = ['#004D61', '#47A138', '#FF5031', '#8B8B8B', '#767676', '#CBCBCB', '#444444', '#E4EDE3'];

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ transactions, type }) => {
  const categoryData = useMemo(() => {
    // Filtrar por tipo e agrupar por categoria
    const filteredTransactions = transactions.filter(t => t.type === type);
    const categoryTotals: Record<string, number> = {};
    
    filteredTransactions.forEach(transaction => {
      if (!categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] = 0;
      }
      categoryTotals[transaction.category] += transaction.amount;
    });
    
    // Converter para array para o Recharts
    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value
    }));
  }, [transactions, type]);

  const title = type === 'income' ? 'Receitas por Categoria' : 'Despesas por Categoria';
  const isEmpty = categoryData.length === 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-300">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {isEmpty ? (
        <div className="h-[250px] flex items-center justify-center text-gray-500">
          Sem dados para exibir
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`R$ ${value}`, undefined]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryPieChart;