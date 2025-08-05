import React from 'react';

interface BottomNavigationProps {
  onNavigate: (view: string) => void;
  activeView: string;
}

export default function BottomNavigation({ onNavigate, activeView }: BottomNavigationProps) {
  const menuItems = [
    { 
      id: "dashboard", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: "Início" 
    },
    { 
      id: "transactions", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      label: "Extrato" 
    },
    { 
      id: "add-transaction", 
      icon: (
        <svg className="w-8 h-8 text-gray-900" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      label: "Pagar",
      isMain: true
    },
    { 
      id: "profile", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: "Perfil" 
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg" role="navigation" aria-label="Navegação principal">
      <div className="flex items-center justify-around">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
              item.isMain
                ? "bg-green-600 text-white p-3 rounded-full shadow-lg"
                : activeView === item.id
                ? "text-green-600"
                : "text-gray-500"
            }`}
            aria-label={`Navegar para ${item.label}`}
            aria-current={activeView === item.id ? "page" : undefined}
            type="button"
          >
            <div className={item.isMain ? "" : "w-6 h-6"} aria-hidden="true">
              {item.icon}
            </div>
            <span className={`text-xs font-medium ${item.isMain ? "sr-only" : ""}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}