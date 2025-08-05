import React from 'react';

interface MobileHeaderProps {
  onNavigate: (view: string) => void;
  activeView: string;
}

export default function MobileHeader({ onNavigate, activeView }: MobileHeaderProps) {
  const getPageTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Dashboard';
      case 'transactions':
        return 'Extrato';
      case 'add-transaction':
        return 'Pagar';
      case 'profile':
        return 'Perfil';
      default:
        return 'ByteBank';
    }
  };

  return (
    <header className="md:hidden bg-gradient-to-r from-green-600 to-green-700 text-white p-4 shadow-lg" role="banner">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white rounded-lg flex items-center justify-center p-1">
            <img src="/logo.png" alt="ByteBank - Logotipo do banco digital" className="h-8 w-auto" />
          </div>
          <div>
            <h1 className="text-lg font-bold sr-only">{getPageTitle()}</h1>
          </div>
        </div>
        
        <button 
          className="p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label="Menu de opções"
          type="button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 01-7.5-7.5H5a2.5 2.5 0 000 5z" />
          </svg>
        </button>
      </div>


    </header>
  );
}