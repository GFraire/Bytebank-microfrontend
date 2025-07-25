import React from 'react';

interface BalanceCardProps {
  title: string;
  value: number;
  type?: 'default' | 'income' | 'expense';
  icon?: React.ReactNode;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ 
  title, 
  value, 
  type = 'default',
  icon
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getColorClass = () => {
    switch (type) {
      case 'income':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'expense':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getColorClass()} shadow-sm`}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">{title}</h3>
        {icon && <div className="text-xl">{icon}</div>}
      </div>
      <p className="text-2xl font-bold mt-2">{formatCurrency(value)}</p>
    </div>
  );
};

export default BalanceCard;