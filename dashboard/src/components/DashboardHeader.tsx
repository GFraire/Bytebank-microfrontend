import React from 'react';

interface DashboardHeaderProps {
  userName?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName = 'Usuário' }) => {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentDate);

  // Primeira letra maiúscula
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-primary">
        Olá, {userName}!
      </h1>
      <p className="text-gray-500">
        {capitalizedDate}
      </p>
    </div>
  );
};

export default DashboardHeader;