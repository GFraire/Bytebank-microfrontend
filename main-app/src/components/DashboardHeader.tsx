import React from 'react';

interface DashboardHeaderProps {
  userName: string;
  pageType?: 'dashboard' | 'transactions' | 'add-transaction' | 'profile';
  showUserProfile?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  userName, 
  pageType = 'dashboard',
  showUserProfile = false 
}) => {
  const getPageConfig = () => {
    switch (pageType) {
      case 'dashboard':
        return {
          icon: (
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          title: 'Dashboard',
          subtitle: 'Visão geral das suas finanças'
        };
      case 'transactions':
        return {
          icon: (
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ),
          title: 'Transações',
          subtitle: 'Histórico completo de movimentações'
        };
      case 'add-transaction':
        return {
          icon: (
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          ),
          title: 'Nova Transação',
          subtitle: 'Adicione uma nova movimentação'
        };
      case 'profile':
        return {
          icon: (
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
          title: 'Perfil',
          subtitle: 'Gerencie suas informações pessoais'
        };
      default:
        return {
          icon: null,
          title: 'ByteBank',
          subtitle: 'Seu banco digital'
        };
    }
  };

  const config = getPageConfig();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4" role="banner">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center" aria-hidden="true">
            {config.icon}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900" id="page-title">{config.title}</h1>
            <p className="text-sm text-gray-600" aria-describedby="page-title">{config.subtitle}</p>
          </div>
        </div>
        {showUserProfile && (
          <div className="text-right" role="complementary" aria-label="Informações do usuário">
            <p className="text-sm text-gray-600">Bem-vindo de volta!</p>
            <p className="text-lg font-semibold text-gray-900" aria-label={`Usuário logado: ${userName}`}>{userName}</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;