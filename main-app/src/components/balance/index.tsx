import React, { useState } from "react";
import { useAuth } from "../../../authContext";

const getDayName = (date: Date) => {
  const days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  return days[date.getDay()];
};

const getFormattedDate = (date: Date) => {
  return date.toLocaleDateString("pt-BR");
};

const Balance: React.FC = () => {
  const { user } = useAuth();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const currentDate = new Date();

  if (!user?.displayName) {
    return null;
  }

  const balance = 2500.0;

  return (
    <div
      className="bg-[#004d61] text-white p-6 rounded-lg shadow mx-auto mt-4"
      style={{ width: "690px", height: "402px" }}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Olá, {user.displayName}! :)</h2>
          <p className="text-sm">
            {getDayName(currentDate)}, {getFormattedDate(currentDate)}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center space-x-2">
            <p className="text-sm">Saldo</p>
            <button
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className="text-orange-500 hover:text-orange-700 focus:outline-none"
            >
              {isBalanceVisible ? "👁️" : "🔒"}
            </button>
          </div>
          <hr className="border-t-2 border-orange-500 w-40 mt-1" />
          <p className="text-sm mt-2">Conta Corrente</p>
          <p className="text-2xl font-bold">
            {isBalanceVisible
              ? `R$ ${balance.toFixed(2).replace(".", ",")}`
              : "****"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
