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
    <header className="md:hidden bg-gradient-to-r from-green-600 to-green-700 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className=" bg-white rounded-lg flex items-center justify-center">
            <img src="/logo.png" alt="ByteBank Logo" />
          </div>
          <div>
            {/* <h1 className="text-lg font-bold">{getPageTitle()}</h1> */}
            {/* <p className="text-green-100 text-xs">ByteBank - Seu banco digital</p> */}
          </div>
        </div>
        
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 01-7.5-7.5H5a2.5 2.5 0 000 5z" />
          </svg>
        </button>
      </div>

      {/* Saldo Mobile - apenas no dashboard */}
      {/* {activeView === 'dashboard' && (
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <p className="text-green-100 text-xs">Saldo disponível</p>
          <p className="text-xl font-bold">R$ 12.450,00</p>
        </div>
      )} */}
    </header>
  );
}