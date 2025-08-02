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
        return 'bg-green-light border-green text-green';
      case 'expense':
        return 'bg-red-50 border-secondary text-secondary';
      default:
        return 'bg-white border-primary text-primary';
    }
  };

  return (
    <article className={`p-6 rounded-lg border ${getColorClass()} shadow-sm transition-all hover:shadow-md`}>
      <header className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium uppercase tracking-wide">{title}</h3>
        {icon && <div className="text-xl opacity-70">{icon}</div>}
      </header>
      <div className="text-3xl font-bold">{formatCurrency(value)}</div>
    </article>
  );
};

export default BalanceCard;