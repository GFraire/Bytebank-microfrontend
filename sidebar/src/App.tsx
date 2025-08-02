import React from "react";
// import Image from "next/image";

interface AppSidebarProps {
  onNavigate?: (view: string) => void;
  activeView?: string;
  onLogout?: () => void;
}

function AppSidebar({ onNavigate, activeView = 'dashboard', onLogout }: AppSidebarProps) {
  const menuItems = [
    { 
      id: "dashboard", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ), 
      label: "Dashboard" 
    },
    { 
      id: "transactions", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ), 
      label: "Transações" 
    },
    { 
      id: "add-transaction", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ), 
      label: "Nova Transação" 
    },
    { 
      id: "profile", 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ), 
      label: "Perfil" 
    },
  ];

  const handleNavigation = (viewId: string) => {
    console.log('Sidebar navigation clicked:', viewId, 'onNavigate exists:', !!onNavigate);
    if (onNavigate) {
      onNavigate(viewId);
    } else {
      console.error('onNavigate function not provided to sidebar');
    }
  };

  return (
    <aside className="bg-white border-r border-gray-200 text-gray-900 w-64 h-screen p-6 shadow-sm flex flex-col">
      {/* Logo */}
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="mb-8">
            <img src="/logo.png" alt="Logo" />
            <p className="text-gray-600 text-sm">Seu banco digital</p>
          </div>
        </div>

      {/* Menu */}
      <nav className="space-y-2 flex-1 mt-10">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
              activeView === item.id
                ? "bg-green-100 text-green-700 font-medium"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <div className="w-5 h-5">{item.icon}</div>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Saldo */}
      {/* <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-gray-600 text-sm">Saldo disponível</p>
        <p className="text-2xl font-bold text-green-600">R$ 12.450,00</p>
      </div> */}

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4">
        <button 
          onClick={onLogout}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}

export default AppSidebar;
