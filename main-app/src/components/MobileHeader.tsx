import React from 'react';

interface MobileHeaderProps {
  onNavigate: (view: string) => void;
  activeView: string;
}

export default function MobileHeader({ onNavigate, activeView }: MobileHeaderProps) {
  const getPageTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Início';
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
    <header className="md:hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-2 shadow-md" role="banner">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-md flex items-center justify-center p-0.5">
            <img src="/logo-mini.png" alt="ByteBank" className="h-5 w-5" />
          </div>
          <h1 className="text-sm font-semibold">{getPageTitle()}</h1>
        </div>
        
        <button 
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Menu"
          type="button"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </header>
  );
}