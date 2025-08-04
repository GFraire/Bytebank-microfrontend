import React from "react";

type BalanceCardProps = {
  title: string;
  value: number;
  type: "default" | "income" | "expense";
};

const BalanceCard: React.FC<BalanceCardProps> = ({ title, value, type }) => {
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

export default BalanceCard;
